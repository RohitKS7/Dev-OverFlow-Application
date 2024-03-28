"use server";

import { FilterQuery } from "mongoose";
import UserModel from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import QuestionModel from "@/database/question.model";
import TagModel from "@/database/tag.model";
import Question from "@/components/forms/Question";
import AnswerModel from "@/database/answer.model";

//  ⁡⁣⁢⁣𝘊𝘳𝘦𝘢𝘵𝘦 𝘜𝘴𝘦𝘳⁡
export async function createUser(createUserParams: CreateUserParams) {
  try {
    //   𝘤𝘰𝘯𝘯𝘦𝘤𝘵 𝘵𝘰 𝘥𝘢𝘵𝘢𝘣𝘢𝘴𝘦 𝘧𝘪𝘳𝘴𝘵
    connectToDatabase();

    const newUser = await UserModel.create(createUserParams);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//  ⁡⁣⁢⁣𝘜𝘱𝘥𝘢𝘵𝘦 𝘜𝘴𝘦𝘳⁡
export async function updateUser(updatedUserData: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = updatedUserData;

    await UserModel.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//  ⁡⁣⁢⁣𝘎𝘦𝘵 𝘈 𝘜𝘴𝘦𝘳⁡ ⁡⁣⁢⁣(͟1 u͟s͟e͟r a͟t ͟a t͟i͟m͟e͟)⁡
export async function getUserById(getUserParams: GetUserByIdParams) {
  try {
    connectToDatabase();

    const { userId } = getUserParams;

    const user = await UserModel.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//  ⁡⁣⁢⁣𝘋𝘦𝘭𝘦𝘵𝘦 𝘜𝘴𝘦𝘳⁡
export async function deleteUser(deleteUserParams: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = deleteUserParams;

    const user = await UserModel.findOneAndDelete({ clerkId });

    // 𝘪𝘧 𝘵𝘩𝘦𝘳𝘦 𝘪𝘴 𝘯𝘰 𝘶𝘴𝘦𝘳 𝘰𝘧 𝘵𝘩𝘦 𝘱𝘳𝘰𝘷𝘪𝘥𝘦𝘥 𝘪𝘥 𝘵𝘩𝘢𝘯 𝘵𝘩𝘳𝘰𝘸 𝘦𝘳𝘳𝘰𝘳
    if (!user) {
      throw new Error("User not found");
    }

    // Delete user from database and all the things they did as a user such as: questions, answers, comments, etc.

    // 𝘨𝘦𝘵 𝘶𝘴𝘦𝘳 𝘲𝘶𝘦𝘴𝘵𝘪𝘰𝘯𝘴 𝘪𝘥𝘴
    const userQuestionIds = await QuestionModel.find({
      author: user._id,
    }).distinct("_id");

    console.log(userQuestionIds);

    // 𝘥𝘦𝘭𝘦𝘵𝘦 𝘶𝘴𝘦𝘳'𝘴 𝘲𝘶𝘦𝘴𝘵𝘪𝘰𝘯𝘴
    await QuestionModel.deleteMany({ author: user._id });

    // 𝘥𝘦𝘭𝘦𝘵𝘦 𝘶𝘴𝘦𝘳
    const deletedUser = await UserModel.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log("Error in deleteUser", error);
    throw error;
  }
}

//  ⁡⁣⁢⁣𝘎𝘦𝘵 𝘈𝘭𝘭 𝘜𝘴𝘦𝘳⁡
export async function getAllUsers(getAllUsersParams: GetAllUsersParams) {
  try {
    connectToDatabase();

    //  𝘐𝘧 ⁡⁢⁣⁣𝘱𝘢𝘨𝘦⁡ 𝘥𝘰𝘦𝘴𝘯'𝘵 𝘦𝘹𝘪𝘴𝘵 𝘵𝘩𝘢𝘯 𝘮𝘢𝘬𝘦 𝘪𝘵 ⁡⁣⁢⁣1⁡, 𝘴𝘢𝘮𝘦 𝘧𝘰𝘳 ⁡⁢⁣⁣𝘱𝘢𝘨𝘦𝘚𝘪𝘻𝘦⁡ 𝘪𝘧 𝘥𝘰𝘦𝘴𝘯'𝘵 𝘦𝘹𝘪𝘴𝘵 𝘵𝘩𝘢𝘯 𝘮𝘢𝘬𝘦 𝘪𝘵 ⁡⁣⁢⁣20⁡
    // const { page = 1, pageSize = 20, filter, searchQuery } = getAllUsersParams;

    const users = await UserModel.find({}).sort({ createdAt: -1 });

    return { users };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//  ⁡⁣⁢⁣Toggle Save Question⁡ (toggle = add & remove)
export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();

    const { userId, questionId, path } = params;

    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // 𝘊𝘩𝘦𝘤𝘬𝘪𝘯𝘨 𝘪𝘧 𝘵𝘩𝘦 𝘲𝘶𝘦𝘴𝘵𝘪𝘰𝘯 𝘪𝘴 𝘢𝘭𝘳𝘦𝘢𝘥𝘺 𝘴𝘢𝘷𝘦𝘥 𝘣𝘺 𝘶𝘴𝘦𝘳
    const isQuestionSaved = user.saved.includes(questionId);

    if (isQuestionSaved) {
      // 𝘳𝘦𝘮𝘰𝘷𝘦 𝘲𝘶𝘦𝘴𝘵𝘪𝘰𝘯 𝘧𝘳𝘰𝘮 𝘴𝘢𝘷𝘦𝘥
      await UserModel.findByIdAndUpdate(
        userId,
        { $pull: { saved: questionId } },
        { new: true }
      );
    } else {
      // 𝘈𝘥𝘥 𝘲𝘶𝘦𝘴𝘵𝘪𝘰𝘯 𝘧𝘳𝘰𝘮 𝘴𝘢𝘷𝘦𝘥
      await UserModel.findByIdAndUpdate(
        userId,
        { $addToSet: { saved: questionId } },
        { new: true }
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//  ⁡⁣⁢⁣Get Saved Questions⁡
export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    connectToDatabase();

    // eslint-disable-next-line no-unused-vars
    const { clerkId, page = 1, pageSize = 10, filter, searchQuery } = params;

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    const user = await UserModel.findOne({ clerkId }).populate({
      path: "saved",
      // 𝘍𝘪𝘭𝘵𝘦𝘳 𝘲𝘶𝘦𝘳𝘺 𝘵𝘰 𝘴𝘦𝘭𝘦𝘤𝘵 𝘵𝘩𝘦 𝘥𝘰𝘤𝘶𝘮𝘦𝘯𝘵𝘴 𝘵𝘩𝘢𝘵 𝘮𝘢𝘵𝘤𝘩 𝘵𝘩𝘦 𝘲𝘶𝘦𝘳𝘺
      // ⁡⁣⁢⁣𝘍𝘪𝘭𝘵𝘦𝘳𝘘𝘶𝘦𝘳𝘺⁡ 𝘤𝘰𝘮𝘪𝘯𝘨 𝘧𝘳𝘰𝘮 𝘮𝘰𝘯𝘨𝘰𝘰𝘴𝘦
      match: query,
      options: {
        sort: { createdAt: -1 },
      },
      // 𝘞𝘦 𝘢𝘳𝘦 𝘱𝘰𝘱𝘶𝘭𝘢𝘵𝘪𝘯𝘨 ⁡⁢⁣⁣𝘛𝘢𝘨𝘴⁡ 𝘢𝘯𝘥 ⁡⁢⁣⁣𝘈𝘶𝘵𝘩𝘰𝘳𝘴⁡ 𝘪𝘯 ⁡⁢⁣⁣𝘚𝘢𝘷𝘦𝘥⁡ 𝘱𝘢𝘵𝘩 𝘰𝘧 ⁡⁣⁣⁢𝘜𝘴𝘦𝘳𝘔𝘰𝘥𝘦𝘭⁡.
      populate: [
        { path: "tags", model: TagModel, select: "_id name" },
        {
          path: "author",
          model: UserModel,
          select: "_id clerkId name picture",
        },
      ],
    });

    if (!user) {
      throw new Error("User not found");
    }

    const savedQuestions = user.saved;

    return { questions: savedQuestions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//  ⁡⁣⁢⁣Get User Info⁡
export async function getUserInfo(params: GetUserByIdParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    //  ⁡⁢⁣⁣𝘤𝘭𝘦𝘳𝘬𝘐𝘥⁡ 𝘪𝘴 𝘦𝘲𝘶𝘢𝘭 𝘵𝘰 ⁡⁢⁣⁣𝘶𝘴𝘦𝘳𝘐𝘥⁡
    const user = await UserModel.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("User not Found");
    }

    //  𝘊𝘰𝘶𝘯𝘵 𝘰𝘯𝘭𝘺 𝘵𝘩𝘦 𝘥𝘰𝘤𝘶𝘮𝘦𝘯𝘵𝘴 𝘸𝘩𝘦𝘳𝘦 𝘢𝘶𝘵𝘩𝘰𝘳 𝘪𝘴 𝘦𝘲𝘶𝘢𝘭 𝘵𝘰 𝘶𝘴𝘦𝘳𝘐𝘥 𝘸𝘦'𝘳𝘦 𝘨𝘦𝘵𝘵𝘪𝘯𝘨 𝘧𝘳𝘰𝘮 𝘢𝘣𝘰𝘷𝘦 𝘪𝘵'𝘭𝘭 𝘨𝘦𝘵 𝘢𝘭𝘭 𝘵𝘩𝘦 𝘥𝘰𝘤𝘶𝘮𝘦𝘯𝘵𝘴 𝘤𝘳𝘦𝘢𝘵𝘦𝘥 𝘣𝘺 𝘵𝘩𝘪𝘴 𝘶𝘴𝘦𝘳
    const totalQuestions = await QuestionModel.countDocuments({
      author: user._id,
    });
    const totalAnswers = await AnswerModel.countDocuments({ author: user._id });

    return {
      user,
      totalQuestions,
      totalAnswers,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
