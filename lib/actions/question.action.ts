"use server";

import QuestionModel from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import TagModel from "@/database/tag.model";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
} from "./shared.types";
import UserModel from "@/database/user.model";
import { revalidatePath } from "next/cache";
import AnswerModel from "@/database/answer.model";
import InteractionModel from "@/database/interaction.model";

//!  ⁡⁣⁢⁣𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻 𝗗𝗼𝗰𝘂𝗺𝗲𝗻𝘁 𝗼𝗻 𝗗𝗮𝘁𝗮𝗯𝗮𝘀𝗲⁡
export async function createQuestion(params: CreateQuestionParams) {
  // eslint-disable-next-line no-empty
  try {
    //!  Connect to Database
    connectToDatabase();

    //  path is the URL for home after the question is submitted successfully to 'Revalidate' next.js
    const { title, content, tags, author, path } = params;

    //!  Create the question
    //   `create()` : This method is used to create and save a new document in the MongoDB database based on the provided data.
    const question = await QuestionModel.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    //   ********  Making connection between TagModel and QuestionModel by adding the `question_id` in 'question' array of TagModel *******
    //   Create the tags or get them if they already exist
    for (const tag of tags) {
      //  This code is using the findOneAndUpdate() method from Mongoose to interact with the TagModel. Let's break down each part of the function call:
      const existingTag = await TagModel.findOneAndUpdate(
        // 1. Query Criteria: The first parameter allows us to find something.
        /*    
        This part specifies the criteria for finding a document in the TagModel collection. It searches for a document where the name field matches the provided tag using a case-insensitive regular expression ($regex), which ensures that the search is not case-sensitive.
        */
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },

        // 2. Update Operations:  The second one allows us to update it.
        /* 
        This part specifies the update operations to be performed on the matched document.
          - `$setOnInsert` operator sets the value of the name field to the provided tag value if a document is created during the upsert operation (i.e., if no matching document is found).
          - `$push operator` adds the _id of the question to the question array field in the document. It's assuming that question is a reference to another model, likely the Question model.
        */
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },

        // 3. Options:   and the last one Provides some additional options.
        /* 
          - `upsert: true` specifies that if no document is found matching the query criteria, a new document should be created based on the update operations.
          - `new: true` ensures that the method returns the modified document if it's upserted or updated.
        */
        { upsert: true, new: true }
      );

      // we only wanna push tag's id
      tagDocuments.push(existingTag._id);
    }

    //   ********  Making connection between QuestionModel and TagModel by adding the `tag_id` in 'tags' array of QuestionModel *******
    //   Find the Question by ID and push the tag-ID of each tag in QuestionModel's tag array.
    await QuestionModel.findByIdAndUpdate(question._id, {
      //   `$push`: This is a MongoDB update operator that adds elements to an array field. In this case, it's adding elements to the tags array field.
      //   `{ tags: { $each: tagDocuments } }`: This specifies that the values to be added to the tags array are contained in the tagDocuments array. `$each` is another MongoDB operator used with `$push` to indicate that multiple values should be added individually rather than as a single array.
      $push: { tags: { $each: tagDocuments } },
    });

    //   Create an interaction record for the user's asked-questions action (means how the number of questions the author have created)

    //   Increment author's reputation by +5 for creating a question

    //!   The revalidatePath function is a feature in Next.js that allows you to update data on a specific page without requiring a full page reload.
    revalidatePath(path);
  } catch (error) {
    console.error("Error creating question:", error);
  }
}

//!  ⁡⁣⁢⁣𝗙𝗲𝘁𝗰𝗵𝗶𝗻𝗴 𝗾𝘂𝗲𝘀𝘁𝗶𝗼𝗻 𝗱𝗮𝘁𝗮⁡
export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    // find all questions and populate(means adding data) all the related tags to that question in 'tags' field of QuestionModel
    const questions = await QuestionModel.find({})
      .populate({ path: "tags", model: TagModel })
      .populate({ path: "author", model: UserModel })
      .sort({
        createdAt: -1,
      }); /* `sort:` will make newly create question appear on top of other questions instead of in the bottom for example:
      without sort => 1. Old question                     with sort => 1. Newly created Question    
                      2. Newly Created question                        2. Old question
      
      */

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//!  ⁡⁣⁢⁣𝗚𝗲𝘁 𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻 𝗕𝘆 𝗜𝗱⁡
export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    connectToDatabase();

    const { questionId } = params;

    // `select: '_id name'` means we're only selecting the '_id' & 'name' of the tag.
    const question = await QuestionModel.findById(questionId)
      .populate({ path: "tags", model: TagModel, select: "_id name" })
      .populate({
        path: "author",
        model: UserModel,
        select: "_id clerkId name picture",
      });

    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//!  ⁡⁣⁢⁣𝗔𝗱𝗱𝗶𝗻𝗴 𝗮𝗻𝗱 𝗨𝗽𝗱𝗮𝘁𝗶𝗻𝗴 𝘂𝗽𝘃𝗼𝘁𝗲𝘀 𝗶𝗻 𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻⁡
export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase();

    // userId: who upvoted the question, questionId: Which question they upvoted, hasupVoted: Did they already upvoted?
    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

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

    const question = await QuestionModel.findByIdAndUpdate(
      questionId,
      updateQuery,
      { new: true }
    );

    if (!question) {
      throw new Error("Question not found");
    }

    // TODO: Increment author's reputataion

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//!  ⁡⁣⁢⁣𝗔𝗱𝗱𝗶𝗻𝗴 𝗮𝗻𝗱 𝗨𝗽𝗱𝗮𝘁𝗶𝗻𝗴 𝗱𝗼𝘄𝗻𝘃𝗼𝘁𝗲𝘀 𝗶𝗻 𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻⁡
export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase();

    // destructuring of Params
    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

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

    const question = await QuestionModel.findByIdAndUpdate(
      questionId,
      updateQuery,
      { new: true }
    );

    if (!question) {
      throw new Error("Question not found");
    }

    // TODO: Increment user's reputation by 10+

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//   ⁡⁣⁢⁣𝗗𝗲𝗹𝗲𝘁𝗲 𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻⁡
export async function deleteQuestion(params: DeleteQuestionParams) {
  try {
    connectToDatabase();

    const { questionId, path } = params;

    await QuestionModel.deleteOne({ _id: questionId });
    // 𝘋𝘦𝘭𝘦𝘵𝘦 𝘢𝘭𝘭 ⁡⁣⁣⁢𝘈𝘯𝘴𝘸𝘦𝘳𝘴⁡ 𝘢𝘴𝘴𝘰𝘤𝘪𝘢𝘵𝘦𝘥 𝘸𝘪𝘵𝘩 𝘵𝘩𝘪𝘴 𝘘𝘶𝘦𝘴𝘵𝘪𝘰𝘯
    await AnswerModel.deleteMany({ question: questionId });
    // 𝘋𝘦𝘭𝘦𝘵𝘦 𝘢𝘭𝘭 ⁡⁣⁣⁢𝘐𝘯𝘵𝘦𝘳𝘢𝘤𝘵𝘪𝘰𝘯𝘴⁡ 𝘳𝘦𝘭𝘢𝘵𝘦𝘥 𝘵𝘰 𝘵𝘩𝘪𝘴 𝘘𝘶𝘦𝘴𝘵𝘪𝘰𝘯
    await InteractionModel.deleteMany({ question: questionId });
    // 𝘜𝘱𝘥𝘢𝘵𝘦 𝘵𝘩𝘦 𝘛𝘢𝘨𝘴 𝘵𝘰 𝘯𝘰 𝘭𝘰𝘯𝘨𝘦𝘳 𝘪𝘯𝘤𝘭𝘶𝘥𝘦 𝘳𝘦𝘧 𝘵𝘩𝘪𝘴 𝘲𝘶𝘦𝘴𝘵𝘪𝘰𝘯
    await TagModel.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } }
    ); // pull means nikal do iss field ko.

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//   ⁡⁣⁢⁣𝗘𝗱𝗶𝘁 𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻⁡
export async function editQuestion(params: EditQuestionParams) {
  try {
    connectToDatabase();

    const { questionId, title, content, path } = params;

    const question = await QuestionModel.findById(questionId).populate("tags");

    if (!question) {
      throw new Error("Question not found");
    }

    question.title = title;
    question.content = content;

    await question.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//   Get Hot Question
export async function getHotQuestions() {
  try {
    connectToDatabase();

    const hotQuestions = await QuestionModel.find({}) // get all questions
      .sort({ views: -1, upvotes: -1 }) // show Top viewed & upvoted on top
      .limit(5); // limit the number of questions to 5

    return hotQuestions;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
