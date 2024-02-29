"use server";

import UserModel from "@/database/user.model";
import { connectToDatabase } from "../mongoose";

export async function getUserById(params: any) {
  try {
    //   connect to database first
    connectToDatabase();

    const { userId } = params;

    //   Get the user from UserModel by searching the user via clerkId
    const user = await UserModel.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
