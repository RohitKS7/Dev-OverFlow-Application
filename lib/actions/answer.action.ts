"use server";

import AnswerModel from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
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
