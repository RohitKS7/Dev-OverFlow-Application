"use server";

import UserModel from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetUserByIdParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import QuestionModel from "@/database/question.model";

//! Create User
export async function createUser(createUserParams: CreateUserParams) {
  try {
    //   connect to database first
    connectToDatabase();

    const newUser = await UserModel.create(createUserParams);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//!  Update User
export async function updateUser(updatedUserData: UpdateUserParams) {
  try {
    //   connect to database first
    connectToDatabase();

    const { clerkId, updateData, path } = updatedUserData;

    //*  ClerkId is using to find the user.
    await UserModel.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//!  Get User
export async function getUserById(getUserParams: GetUserByIdParams) {
  try {
    //   connect to database first
    connectToDatabase();

    const { userId } = getUserParams;

    //   Get the user from UserModel by searching the user via clerkId
    const user = await UserModel.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//!  Delete User
export async function deleteUser(deleteUserParams: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = deleteUserParams;

    const user = await UserModel.findOneAndDelete({ clerkId });

    // if there is no user of the provided id than throw error
    if (!user) {
      throw new Error("User not found");
    }

    // Delete user from database and all the things they did as a user such as: questions, answers, comments, etc.

    // get user questions ids
    const userQuestionIds = await QuestionModel.find({
      author: user._id,
    }).distinct("_id");

    console.log(userQuestionIds);

    // delete user questions
    await QuestionModel.deleteMany({ author: user._id });

    // delete user
    const deletedUser = await UserModel.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log("Error in deleteUser", error);
    throw error;
  }
}
