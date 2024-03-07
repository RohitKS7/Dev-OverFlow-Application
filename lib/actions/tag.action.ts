"use server";

import UserModel from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    // how many do we want to get back, the limit is 3 tags
    const { userId } = params;

    // Find the User
    const user = await UserModel.findById(userId);

    if (!user) throw new Error("User not found");

    // TODO: find interaction for the user and group of tags... from InteractionModel we'll create

    return [
      {
        _id: 1,
        name: "tag1",
      },
      {
        _id: 2,
        name: "tag2",
      },
      {
        _id: 3,
        name: "tag3",
      },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
