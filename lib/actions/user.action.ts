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
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import QuestionModel from "@/database/question.model";
import TagModel from "@/database/tag.model";
import AnswerModel from "@/database/answer.model";
import { BadgeCriteriaType } from "@/types";
import { assignBadges } from "../utils";

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

    const { searchQuery, filter, page = 1, pageSize = 2 } = getAllUsersParams;

    // ⁡⁣⁢⁣𝗤𝘂𝗲𝗿𝘆⁡
    // 𝘲𝘶𝘦𝘳𝘺 𝘪𝘴 𝘦𝘲𝘶𝘢𝘭 𝘵𝘰 𝘦𝘮𝘱𝘵𝘺 𝘰𝘣𝘫𝘦𝘤𝘵 𝘢𝘵 𝘵𝘩𝘦 𝘴𝘵𝘢𝘳𝘵
    const query: FilterQuery<typeof UserModel> = {};
    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    // ⁡⁣⁢⁣⁡⁣⁢⁣𝗙𝗶𝗹𝘁𝗲𝗿⁡
    let sortOptions = {};
    switch (filter) {
      case "new_users":
        sortOptions = { joinedAt: -1 };
        break;
      case "old_users":
        sortOptions = { joinedAt: 1 };
        break;
      case "top_contributors":
        sortOptions = { reputation: -1 };
        break;

      default:
        break;
    }

    // ⁡⁣⁢⁣𝗣𝗮𝗴𝗶𝗻𝗮𝘁𝗶𝗼𝗻⁡
    const skipAmount = (page - 1) * pageSize;

    // ⁡⁣⁢⁣𝗥𝗲𝘁𝗿𝗶𝘃𝗲 𝗨𝘀𝗲𝗿𝘀⁡
    const users = await UserModel.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    // ⁡⁣⁢⁣𝗣𝗮𝗴𝗶𝗻𝗮𝘁𝗶𝗼𝗻⁡
    const totalUsers = await UserModel.countDocuments(query);
    const isNext = totalUsers > skipAmount + users.length;

    return { users, isNext };
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

    const { clerkId, page = 1, pageSize = 5, filter, searchQuery } = params;

    // ⁡⁣⁢⁣𝗣𝗮𝗴𝗶𝗻𝗮𝘁𝗶𝗼𝗻⁡
    const skipAmount = (page - 1) * pageSize;

    // ⁡⁣⁢⁣𝗤𝘂𝗲𝗿𝘆⁡
    const query: FilterQuery<typeof QuestionModel> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    // ⁡⁣⁢⁣⁡⁣⁢⁣𝗙𝗶𝗹𝘁𝗲𝗿⁡
    let sortOptions = {};
    switch (filter) {
      case "most_recent":
        sortOptions = { createdAt: -1 };
        break;
      case "oldest":
        sortOptions = { createdAt: 1 };

        break;
      case "most_voted":
        sortOptions = { upvotes: -1 };

        break;
      case "most_viewed":
        sortOptions = { views: -1 };

        break;
      case "most_answered":
        sortOptions = { answers: -1 };

        break;

      default:
        break;
    }

    // ⁡⁣⁢⁣𝗥𝗲𝘁𝗿𝗶𝘃𝗲 𝗨𝘀𝗲𝗿 𝗦𝗮𝘃𝗲𝗱 𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻𝘀⁡
    const user = await UserModel.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: sortOptions,
        skip: skipAmount,
        limit: pageSize + 1,
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

    // ⁡⁣⁢⁣𝗣𝗮𝗴𝗶𝗻𝗮𝘁𝗶𝗼𝗻⁡
    const isNext = savedQuestions.length > pageSize;

    return { questions: savedQuestions, isNext };
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

    // ⁡⁢⁣⁢𝗝𝗦𝗠 𝗠𝗲𝘁𝗵𝗼𝗱 𝗳𝗼𝗿 𝗕𝗮𝗱𝗴𝗲𝗶𝗻𝗴 𝗦𝘆𝘀𝘁𝗲𝗺⁡ (based on no. of answers, questions, upvotes/downvotes on them, views etc. of an user)
    const [questionUpvotes] = await QuestionModel.aggregate([
      { $match: { author: user._id } },
      {
        $project: {
          _id: 0,
          upvotes: { $size: "$upvotes" },
        },
      },
      {
        $group: {
          _id: null,
          totalUpvotes: { $sum: "$upvotes" },
        },
      },
    ]);

    const [answerUpvotes] = await AnswerModel.aggregate([
      { $match: { author: user._id } },
      {
        $project: {
          _id: 0,
          upvotes: { $size: "$upvotes" },
        },
      },
      {
        $group: {
          _id: null,
          totalUpvotes: { $sum: "$upvotes" },
        },
      },
    ]);

    const [questionViews] = await QuestionModel.aggregate([
      { $match: { author: user._id } },
      {
        $group: {
          _id: null,
          totalViews: { $sum: "$views" },
        },
      },
    ]);

    const criteria = [
      { type: "QUESTION_COUNT" as BadgeCriteriaType, count: totalQuestions },
      { type: "ANSWER_COUNT" as BadgeCriteriaType, count: totalAnswers },
      {
        type: "QUESTION_UPVOTES" as BadgeCriteriaType,
        count: questionUpvotes?.totalUpvotes || 0,
      },
      {
        type: "ANSWER_UPVOTES" as BadgeCriteriaType,
        count: answerUpvotes?.totalUpvotes || 0,
      },
      {
        type: "TOTAL_VIEWS" as BadgeCriteriaType,
        count: questionViews?.totalViews || 0,
      },
    ];

    //  @ts-ignore
    const badgeCounts = assignBadges({ criteria });

    return {
      user,
      totalQuestions,
      totalAnswers,
      badgeCounts,
      reputation: user.reputation,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// ⁡⁣⁢⁣ Get User's Questions⁡
export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    connectToDatabase();

    const { userId, page = 1, pageSize = 4 } = params;

    const skipAmount = (page - 1) * pageSize;

    const totalQuestions = await QuestionModel.countDocuments({
      author: userId,
    });

    const userQuestions = await QuestionModel.find({ author: userId })
      .sort({ createdAt: -1, views: -1, upvotes: -1 })
      .populate("tags", "_id name")
      .populate("author", "_id clerkId name picture")
      .skip(skipAmount)
      .limit(pageSize);

    const isNext = totalQuestions > skipAmount + userQuestions.length;

    return { totalQuestions, questions: userQuestions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// ⁡⁣⁢⁣ ⁡⁣⁢⁣Get User's Answers⁡
export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    connectToDatabase();

    // eslint-disable-next-line no-unused-vars
    const { userId, page = 1, pageSize = 4 } = params;

    const skipAmount = (page - 1) * pageSize;

    const totalAnswers = await AnswerModel.countDocuments({
      author: userId,
    });

    const userAnswers = await AnswerModel.find({ author: userId })
      .sort({ upvotes: -1 })
      .populate("question", "_id title")
      .populate("author", "_id clerkId name picture")
      .skip(skipAmount)
      .limit(pageSize);

    const isNext = totalAnswers > skipAmount + userAnswers.length;

    return { totalAnswers, answers: userAnswers, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
