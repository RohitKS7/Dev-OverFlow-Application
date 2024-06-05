"use server";

import QuestionModel from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import InteractionModel from "@/database/interaction.model";
import UserModel from "@/database/user.model";

//   ⁡⁣⁢⁣𝗜𝗺𝗽𝗹𝗶𝗺𝗲𝗻𝘁 𝗩𝗶𝗲𝘄 𝗮𝗰𝘁𝗶𝗼𝗻 𝗳𝗼𝗿 𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻⁡
export async function viewQuestion(params: ViewQuestionParams) {
  try {
    connectToDatabase();

    const { questionId, userId } = params;

    // ⁡⁣⁣⁢𝘜𝘱𝘥𝘢𝘵𝘦 𝘷𝘪𝘦𝘸 𝘤𝘰𝘶𝘯𝘵 𝘧𝘰𝘳 𝘵𝘩𝘦 𝘲𝘶𝘦𝘴𝘵𝘪𝘰𝘯⁡
    await QuestionModel.findByIdAndUpdate(questionId, {
      $inc: { views: 1 },
    }); // `⁡⁣⁣⁢$inc⁡` = ⁡⁢⁣⁣increment⁡

    // ⁡⁣⁣⁢𝘎𝘦𝘵 𝘵𝘩𝘦 𝘦𝘹𝘪𝘴𝘵𝘪𝘯𝘨 𝘐𝘯𝘵𝘦𝘳𝘢𝘤𝘵𝘪𝘰𝘯 𝘰𝘧 𝘜𝘴𝘦𝘳 𝘪𝘧 𝘸𝘦 𝘩𝘢𝘷𝘦⁡
    if (userId) {
      const existingInteraction = await InteractionModel.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction) return console.log("User has already viewed");

      // ⁡⁣⁣⁢𝘐𝘧 𝘸𝘦 ⁡⁣⁢⁣𝘏𝘢𝘷𝘦𝘯'𝘵⁡ ⁡⁣⁣⁢𝘵𝘩𝘦𝘯⁡ ⁡⁣⁢⁣𝘊𝘳𝘦𝘢𝘵𝘦 𝘢 𝘐𝘯𝘵𝘦𝘳𝘢𝘤𝘵𝘪𝘰𝘯 𝘋𝘰𝘤𝘶𝘮𝘦𝘯𝘵⁡
      await InteractionModel.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }

    // ⁡⁣⁣⁢Increment User's Reputation by 2 for every 10 views on their question⁡
    const viewsOnQuestion = await QuestionModel.findById(questionId);

    if (viewsOnQuestion !== null) {
      // Calculate the number of repuation points to add
      const reputationIncrement = Math.floor(viewsOnQuestion / 10);

      if (reputationIncrement > 0) {
        await UserModel.findByIdAndUpdate(viewsOnQuestion.author, {
          $inc: { reputation: reputationIncrement },
        });
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
