"use server";

import AnswerModel from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import QuestionModel from "@/database/question.model";
import { revalidatePath } from "next/cache";
import InteractionModel from "@/database/interaction.model";

//! ⁡⁣⁢⁣𝗖𝗿𝗲𝗮𝘁𝗲 𝗔𝗻𝘀𝘄𝗲𝗿 𝗗𝗼𝗰𝘂𝗺𝗲𝗻𝘁 𝗼𝗻 𝗗𝗮𝘁𝗮𝗯𝗮𝘀𝗲⁡
export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    // 𝘢𝘶𝘵𝘩𝘰𝘳 𝘢𝘯𝘥 𝘲𝘶𝘦𝘴𝘵𝘪𝘰𝘯 𝘪𝘴 𝘐𝘋 𝘰𝘧 𝘵𝘩𝘰𝘴𝘦.
    const { content, author, question, path } = params;

    const newAnswer = await AnswerModel.create({ content, author, question });

    // 𝘈𝘥𝘥 𝘵𝘩𝘦 𝘢𝘯𝘴𝘸𝘦𝘳 𝘵𝘰 𝘵𝘩𝘦 𝘲𝘶𝘦𝘴𝘵𝘪𝘰𝘯'𝘴 𝘢𝘯𝘴𝘸𝘦𝘳𝘴 𝘢𝘳𝘳𝘢𝘺
    await QuestionModel.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log("Something went wrong while creating Answer:", error);
    throw error;
  }
}

//!  ⁡⁣⁢⁣𝗚𝗲𝘁 𝗔𝗹𝗹 𝗔𝗻𝘀𝘄𝗲𝗿𝘀⁡
export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId, sortBy, page = 1, pageSize = 2 } = params;

    const skipAmount = (page - 1) * pageSize;

    let sortOptions = {};

    switch (sortBy) {
      case "highestUpvotes":
        sortOptions = { upvotes: -1 };
        break;
      case "lowestUpvotes":
        sortOptions = { upvotes: 1 };
        break;
      case "recent":
        sortOptions = { createdAt: -1 };
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;

      default:
        break;
    }

    const answers = await AnswerModel.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalAnswer = await AnswerModel.countDocuments({
      question: questionId,
    });
    const isNext = totalAnswer > skipAmount + answers.length;

    return { answers, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//!  ⁡⁣⁢⁣𝗔𝗱𝗱𝗶𝗻𝗴 𝗮𝗻𝗱 𝗨𝗽𝗱𝗮𝘁𝗶𝗻𝗴 𝘂𝗽𝘃𝗼𝘁𝗲𝘀 𝗶𝗻 𝗔𝗻𝘀𝘄𝗲𝗿⁡
export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();

    // userId: who upvoted the question, questionId: Which question they upvoted, hasupVoted: Did they already upvoted?
    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if (hasupVoted) {
      // Agar user ne upvote kra ho, tho uski ID pull karo and add in question model
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      // Agar user ne downvote kra ho, tho uski ID pull karo and upvotes me push. This to prevent User from downvoting and upvoting at the same time.
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      // Agar kuch nahi kia ho, tho new action ke hisab se user ko upvote me add kr do
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const answer = await AnswerModel.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Asnwer not found");
    }

    // TODO: Increment author's reputataion

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//!  ⁡⁣⁢⁣𝗔𝗱𝗱𝗶𝗻𝗴 𝗮𝗻𝗱 𝗨𝗽𝗱𝗮𝘁𝗶𝗻𝗴 𝗱𝗼𝘄𝗻𝘃𝗼𝘁𝗲𝘀 𝗶𝗻 𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻⁡
export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();

    // destructuring of Params
    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    // Checking hasupVoted and hasdownVoted
    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const answer = await AnswerModel.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Asnwer not found");
    }

    // TODO: Increment user's reputation by 10+

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//   ⁡⁣⁢⁣𝗗𝗲𝗹𝗲𝘁𝗲 𝗔𝗻𝘀𝘄𝗲𝗿⁡
export async function deleteAnswer(params: DeleteAnswerParams) {
  try {
    connectToDatabase();

    const { answerId, path } = params;

    const answer = await AnswerModel.findById(answerId);

    if (!answer) {
      throw new Error("Answer not Found");
    }

    // 𝘋𝘦𝘭𝘦𝘵𝘦 𝘵𝘩𝘦 𝘈𝘯𝘴𝘸𝘦𝘳
    await answer.deleteOne({ _id: answerId });
    // 𝘜𝘱𝘥𝘢𝘵𝘦 𝘢𝘭𝘭 𝘵𝘩𝘦 𝘲𝘶𝘦𝘴𝘵𝘪𝘰𝘯 𝘳𝘦𝘭𝘢𝘵𝘦𝘥 𝘵𝘰 𝘵𝘩𝘴𝘪 𝘢𝘯𝘴𝘸𝘦𝘳
    await QuestionModel.updateMany(
      { _id: answer.question },
      { $pull: { AnswerSchema: answerId } }
    ); // pull means nikal do iss field ko.
    // 𝘋𝘦𝘭𝘦𝘵𝘦 𝘢𝘭𝘭 ⁡⁣⁣⁢𝘐𝘯𝘵𝘦𝘳𝘢𝘤𝘵𝘪𝘰𝘯𝘴⁡ 𝘳𝘦𝘭𝘢𝘵𝘦𝘥 𝘵𝘰 𝘵𝘩𝘪𝘴 Answer
    await InteractionModel.deleteMany({ question: answerId });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
