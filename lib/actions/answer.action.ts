"use server";

import AnswerModel from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import QuestionModel from "@/database/question.model";
import { revalidatePath } from "next/cache";

//! Create Answer Document on Database
export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    // author and question is ID of those.
    const { content, author, question, path } = params;

    const newAnswer = await AnswerModel.create({ content, author, question });

    // Add the answer to the question's answers array
    await QuestionModel.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log("Something went wrong while creating Answer:", error);
    throw error;
  }
}

//! Get All Answers
export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId } = params;

    const answers = await AnswerModel.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });

    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//!  Adding and Updating upvotes in Answer
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

//!  Adding and Updating downvotes in Question
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
