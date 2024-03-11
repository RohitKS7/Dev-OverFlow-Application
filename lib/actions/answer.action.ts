"use server";

import AnswerModel from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams } from "./shared.types";
import QuestionModel from "@/database/question.model";
import { revalidatePath } from "next/cache";

//! Create Answer Document on Database
export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    // author and question is ID of those.
    const { content, author, question, path } = params;

    const newAnswer = new AnswerModel({ content, author, question });

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
