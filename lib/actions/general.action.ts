"use server";

import QuestionModel from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { SearchParams } from "./shared.types";
import TagModel from "@/database/tag.model";
import AnswerModel from "@/database/answer.model";
import UserModel from "@/database/user.model";

const SearchableTypes = ["question", "answer", "user", "tag"];

export async function globalSearchFunc(params: SearchParams) {
  try {
    await connectToDatabase();

    const { query, type } = params;

    const regexQuery = { $regex: query, $options: "i" };

    let results: { title: any; type: string | null | undefined; id: any }[] =
      [];

    const modelsAndTypes = [
      { model: QuestionModel, searchField: "title", type: "question" },
      { model: UserModel, searchField: "name", type: "user" },
      { model: AnswerModel, searchField: "content", type: "answer" },
      { model: TagModel, searchField: "name", type: "tag" },
    ];

    // Change UpperCase Types into LowerCase
    const typeLower = type?.toLowerCase();

    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      // ⁡⁣⁣⁡⁣⁢⁣𝗦𝗲𝗮𝗿𝗰𝗵 Whole Database⁡
      // ⁡⁢⁣⁣If No Type is clicked or a search Not from SearchableTypes⁡, Then Search across all the database
      //   ⁡⁣⁢⁣𝗧𝗜𝗣⁡ : Never use async/await in ⁡⁣⁣⁢forEach⁡ & ⁡⁣⁣⁢map⁡ or ⁡⁣⁣⁢other itrative⁡ ⁡⁣⁣⁢functions⁡
      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(2);

        results.push(
          ...queryResults.map((item) => ({
            title:
              type === "answer"
                ? `Answers containing ${query}`
                : item[searchField],
            type,
            id:
              type === "user"
                ? item.clerkid
                : type === "answer"
                ? item.question
                : item._id,
          }))
        );
      }
    } else {
      // ⁡⁣⁣⁡⁣⁢⁣𝗦𝗲𝗮𝗿𝗰𝗵 in the Specified Model based on Type⁡
      const modelInfo = modelsAndTypes.find((item) => item.type === type);

      if (!modelInfo) {
        throw new Error("invalid search type");
      }

      const queryResults = await modelInfo.model
        .find({ [modelInfo.searchField]: regexQuery })
        .limit(7);

      results = queryResults.map((item) => ({
        title:
          type === "answer"
            ? `Answers containing ${query}`
            : item[modelInfo.searchField],
        type,
        id:
          type === "user"
            ? item.clerkId
            : type === "answer"
            ? item.question
            : item._id,
      }));
    }

    return JSON.stringify(results);
  } catch (error) {
    console.log("Error while fetching global search", error);
    throw error;
  }
}
