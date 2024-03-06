"use server";

import QuestionModel from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import TagModel from "@/database/tag.model";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";
import UserModel from "@/database/user.model";
import { revalidatePath } from "next/cache";

// *****  Fetching question data
export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    // find all questions and populate(add data) all the related tags to that question in 'tags' field of QuestionModel
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

// *****  Create a Question }
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
