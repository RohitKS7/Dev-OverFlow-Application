"use server";

import UserModel from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import TagModel, { ITag } from "@/database/tag.model";
import { FilterQuery } from "mongoose";
import QuestionModel from "@/database/question.model";
import InteractionModel from "@/database/interaction.model";

//   ⁡⁣⁢⁣𝗚𝗲𝘁 𝗧𝗼𝗽 𝗜𝗻𝘁𝗲𝗿𝗮𝗰𝘁𝗲𝗱 𝗧𝗮𝗴𝘀 𝗼𝗳 𝗮𝗻 𝗨𝘀𝗲𝗿⁡
export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    // how many do we want to get back, the limit is 3 tags
    const { userId } = params;

    // Find the User
    const user = await UserModel.findById(userId);

    if (!user) throw new Error("User not found");

    // Find the user's Interactions
    const userTags = await InteractionModel.aggregate([
      { $match: { user: user._id } }, // Match interactions for the given user
      { $unwind: "$tags" }, // Deconstruct the tags array
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      }, // Group by tag ID and count occurrences
      { $sort: { count: -1 } }, // Sort by the count in descending order
      { $limit: 3 },
    ]);

    const populatedTags = await TagModel.find({
      _id: { $in: userTags.map((tag) => tag._id) },
    });
    return populatedTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//   ⁡⁣⁢⁣𝗚𝗲𝘁 𝗔𝗹𝗹 𝗧𝗮𝗴𝘀⁡
export async function getAllTags(getAllTagsParams: GetAllTagsParams) {
  try {
    connectToDatabase();

    //  If page doesn't exist than make it 1, same for pageSize if doesn't exist than make it 20
    const { searchQuery, filter, page = 1, pageSize = 8 } = getAllTagsParams;

    const query: FilterQuery<ITag> = {};

    const skipAmount = (page - 1) * pageSize;

    let sortOptions = {};
    switch (filter) {
      case "popular":
        sortOptions = { questions: -1 };
        break;
      case "recent":
        sortOptions = { createdOn: -1 };
        break;
      case "name":
        sortOptions = { name: 1 };
        break;
      case "old":
        sortOptions = { createdOn: 1 };
        break;

      default:
        break;
    }

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }

    const tags = await TagModel.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalTags = await TagModel.countDocuments(query);
    const isNext = totalTags > skipAmount + tags.length;

    return { tags, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//  ⁡⁣⁢⁣𝗚𝗲𝘁 𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻𝘀 𝗕𝘆 𝗧𝗮𝗴𝗜𝗱⁡
export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();

    const { tagId, searchQuery, page = 1, pageSize = 5 } = params;

    const skipAmount = (page - 1) * pageSize;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };
    const query: FilterQuery<typeof QuestionModel> = {};

    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { content: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    const tag = await TagModel.findOne({
      ...tagFilter,
      ...query,
    }).populate({
      path: "questions",
      model: QuestionModel,
      match: searchQuery
        ? {
            $or: [
              { title: { $regex: new RegExp(searchQuery, "i") } },
              { content: { $regex: new RegExp(searchQuery, "i") } },
            ],
          }
        : {},
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize + 1, // +1 to check if there is next page
      },
      populate: [
        { path: "tags", model: TagModel, select: "_id name" },
        {
          path: "author",
          model: UserModel,
          select: "_id clerkId name picture",
        },
      ],
    });

    if (!tag) {
      throw new Error("No Tag related questions found");
    }

    const tagRelatedQuestions = tag.questions;
    const isNext = tagRelatedQuestions.length > pageSize;
    return { tagTitle: tag.name, tagRelatedQuestions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//  Get Top Popular Tags
export async function getTopPopularTags() {
  try {
    connectToDatabase();

    const popularTags = await TagModel.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);

    return popularTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
