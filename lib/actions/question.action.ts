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
  RecommendedParams,
} from "./shared.types";
import UserModel from "@/database/user.model";
import { revalidatePath } from "next/cache";
import AnswerModel from "@/database/answer.model";
import InteractionModel from "@/database/interaction.model";
import { FilterQuery } from "mongoose";

//!  ⁡⁣⁢⁣Create a Question Document on Database⁡
export async function createQuestion(params: CreateQuestionParams) {
  try {
    //!  ⁡⁣⁢⁣𝗖𝗼𝗻𝗻𝗲𝗰𝘁 𝘁𝗼 𝗗𝗮𝘁𝗮𝗯𝗮𝘀𝗲⁡
    connectToDatabase();

    //  path is the URL for home after the question is submitted successfully to 'Revalidate' next.js
    const { title, content, tags, author, path } = params;

    //!  ⁡⁣⁢⁣𝗖𝗿𝗲𝗮𝘁𝗲 𝘁𝗵𝗲 𝗾𝘂𝗲𝘀𝘁𝗶𝗼𝗻⁡
    //   `create()` : This method is used to create and save a new document in the MongoDB database based on the provided data.
    const question = await QuestionModel.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    //   ********  ⁡⁣⁢⁣𝗠𝗮𝗸𝗶𝗻𝗴 𝗰𝗼𝗻𝗻𝗲𝗰𝘁𝗶𝗼𝗻 𝗯𝗲𝘁𝘄𝗲𝗲𝗻 𝗧𝗮𝗴𝗠𝗼𝗱𝗲𝗹 𝗮𝗻𝗱 𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻𝗠𝗼𝗱𝗲𝗹⁡ by adding the `question_id` in 'question' array of TagModel *******
    //   Create the tags or get them if they already exist
    for (const tag of tags) {
      //  This code is using the findOneAndUpdate() method from Mongoose to interact with the TagModel. Let's break down each part of the function call:
      const existingTag = await TagModel.findOneAndUpdate(
        // ⁡⁣⁣⁢1. Query Criteria:⁡ The first parameter allows us to find something.
        /*    
        This part specifies the criteria for finding a document in the TagModel collection. It searches for a document where the name field matches the provided tag using a case-insensitive regular expression ($regex), which ensures that the search is not case-sensitive.
        */
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },

        // ⁡⁣⁣⁢2. Update Operations:⁡  The second one allows us to update it.
        /* 
        This part specifies the update operations to be performed on the matched document.
          - ⁡⁢⁣⁣`$setOnInsert`⁡ operator sets the value of the name field to the provided tag value if a document is created during the upsert operation (i.e., if no matching document is found).
          - ⁡⁢⁣⁣`$push operator`⁡ adds the _id of the question to the question array field in the document. It's assuming that question is a reference to another model, likely the Question model.
        */
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },

        // ⁡⁣⁣⁢3. Options:⁡   and the last one Provides some additional options.
        /* 
          - `⁡⁢⁣⁣upsert: true`⁡ specifies that if no document is found matching the query criteria, a new document should be created based on the update operations.
          - ⁡⁢⁣⁣`new: true`⁡ ensures that the method returns the modified document if it's upserted or updated.
        */
        { upsert: true, new: true }
      );

      // we only wanna push tag's id
      tagDocuments.push(existingTag._id);
    }

    //   ********  ⁡⁣⁢⁣𝗠𝗮𝗸𝗶𝗻𝗴 𝗰𝗼𝗻𝗻𝗲𝗰𝘁𝗶𝗼𝗻 𝗯𝗲𝘁𝘄𝗲𝗲𝗻 𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻𝗠𝗼𝗱𝗲𝗹 𝗮𝗻𝗱 𝗧𝗮𝗴𝗠𝗼𝗱𝗲𝗹⁡ by adding the `tag_id` in 'tags' array of QuestionModel *******
    //   Find the Question by ID and push the tag-ID of each tag in QuestionModel's tag array.
    await QuestionModel.findByIdAndUpdate(question._id, {
      //   `$push`: This is a MongoDB update operator that adds elements to an array field. In this case, it's adding elements to the tags array field.
      //   `{ tags: { $each: tagDocuments } }`: This specifies that the values to be added to the tags array are contained in the tagDocuments array. `$each` is another MongoDB operator used with `$push` to indicate that multiple values should be added individually rather than as a single array.
      $push: { tags: { $each: tagDocuments } },
    });

    //  ⁡⁣⁣⁢ ⁡⁣⁢⁣𝗖𝗿𝗲𝗮𝘁𝗲 𝗮𝗻 𝗶𝗻𝘁𝗲𝗿𝗮𝗰𝘁𝗶𝗼𝗻 𝗿𝗲𝗰𝗼𝗿𝗱⁡ ⁡⁣⁣⁢for the user's asked-questions action⁡⁡ (means how many number of questions the author have created)
    await InteractionModel.create({
      user: author,
      action: "ask_question",
      question: question._id,
      tags: tagDocuments,
    });

    //   ⁡⁣⁣⁢Increment author's reputation by +5 for creating a question⁡
    await UserModel.findByIdAndUpdate(author, { $inc: { reputation: 5 } });

    //!   ⁡⁣⁢⁣𝗧𝗵𝗲 𝗿𝗲𝘃𝗮𝗹𝗶𝗱𝗮𝘁𝗲𝗣𝗮𝘁𝗵 𝗳𝘂𝗻𝗰𝘁𝗶𝗼𝗻⁡ is a feature in Next.js that allows you to update data on a specific page without requiring a full page reload.
    revalidatePath(path);
  } catch (error) {
    console.error("Error creating question:", error);
  }
}

//!  ⁡⁣⁢⁣Fetching question data⁡
export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    // 𝘗𝘢𝘨𝘦 𝘢𝘯𝘥 𝘗𝘢𝘨𝘦𝘚𝘪𝘻𝘦 𝘷𝘢𝘭𝘶𝘦𝘴 𝘢𝘳𝘦 𝘤𝘰𝘮𝘪𝘯𝘨 𝘧𝘳𝘰𝘮 𝘱𝘢𝘳𝘢𝘮𝘴 𝘣𝘶𝘵 𝘪𝘧 𝘯𝘰𝘵 𝘵𝘩𝘦𝘯 𝘪𝘵 𝘸𝘪𝘭𝘭 𝘶𝘴𝘦 𝘵𝘩𝘦𝘪𝘳 𝘥𝘦𝘧𝘢𝘶𝘭𝘵 𝘷𝘢𝘭𝘶𝘦𝘴
    const { searchQuery, filter, page = 1, pageSize = 6 } = params;

    // ⁡⁣⁢⁣𝗣𝗮𝗴𝗶𝗻𝗮𝘁𝗶𝗼𝗻⁡
    // 𝘊𝘢𝘭𝘤𝘶𝘭𝘢𝘵𝘦 𝘵𝘩𝘦 𝘯𝘶𝘮𝘣𝘦𝘳 𝘰𝘧 𝘱𝘰𝘴𝘵𝘴 𝘵𝘰 𝘴𝘬𝘪𝘱 𝘣𝘢𝘴𝘦𝘥 𝘰𝘯 𝘵𝘩𝘦 𝘱𝘢𝘨𝘦 𝘯𝘶𝘮𝘣𝘦𝘳 𝘢𝘯𝘥 𝘱𝘢𝘨𝘦 𝘴𝘪𝘻𝘦
    const skipAmount = (page - 1) * pageSize; // pageNumber - 1 and then multiply the result with pageSize

    // ⁡⁣⁢⁣𝗤𝘂𝗲𝗿𝘆⁡
    const query: FilterQuery<typeof QuestionModel> = {};

    // ⁡⁣⁢⁣𝗙𝗶𝗹𝘁𝗲𝗿⁡
    let sortOptions = {};

    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 }; // get the 'newest' one
        break;

      case "frequent":
        sortOptions = { views: -1 }; // get the most "viewed" one
        break;

      case "unanswered":
        query.answers = { $size: 0 };
        break;

      default:
        break;
    }

    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { content: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    // ⁡⁣⁢⁣𝗥𝗲𝘁𝗿𝗶𝘃𝗲 𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻𝘀⁡
    // find all questions and populate(means adding data) all the related tags to that question in 'tags' field of QuestionModel
    const questions = await QuestionModel.find(query)
      .populate({ path: "tags", model: TagModel })
      .populate({ path: "author", model: UserModel })
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);

    // ⁡⁣⁢⁣𝗣𝗮𝗴𝗶𝗻𝗮𝘁𝗶𝗼𝗻⁡
    const totalQuestions = await QuestionModel.countDocuments(query);
    const isNext = totalQuestions > skipAmount + questions.length; // questions.length is the number of questions we are showing on a specific page.

    /* ⁡⁣⁢⁣𝗛𝗲𝗿𝗲'𝘀 𝗮𝗻 𝗲𝘅𝗮𝗺𝗽𝗹𝗲 𝘁𝗼 𝗶𝗹𝗹𝘂𝘀𝘁𝗿𝗮𝘁𝗲⁡:
    
   - Suppose there are a total of ⁡⁣⁣⁢50 questions⁡ in the database.

   - The current page is page 2 (page = 2) and the page size is 20 (pageSize = 20).
   
   - Therefore, skipAmount would be ⁡⁢⁣⁣(2 - 1) * 20 = 20⁡.

   - If questions.length is, for example, 20 (indicating that 20 questions were retrieved for the current page), then isNext would be calculated as⁡⁢⁣⁣ `50 > (20 + 20)⁡`, which evaluates to true.

   - This means that there are more questions available beyond the current page, and ⁡⁣⁣⁢isNext would be true⁡. */

    return { questions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//!  ⁡⁣⁢⁣Get Question By Id⁡
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

//!  ⁡⁣⁢⁣Adding and Updating upvotes in Question⁡
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

    // ⁡⁣⁣⁢Increment author's reputataion⁡⁣⁣⁢ by +1/-1⁡ for upvoting and revoking respectivly
    if (question.author === userId) {
      console.error("You Can't Increment your own reputation", userId);
    } else {
      await UserModel.findByIdAndUpdate(userId, {
        $inc: { reputation: hasupVoted ? -1 : 1 }, // if already upvoted and then clicking it again to revoke the vote then '-1' else '+1'
      });
    }

    // ⁡⁣⁣⁢Increment author's reputation by +10/-10⁡ for recieving an upvote/downvote to the question
    await UserModel.findByIdAndUpdate(question.author, {
      $inc: { reputation: hasupVoted ? -10 : 10 },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//!  ⁡⁣⁢⁣Adding and Updating downvotes in Question⁡
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

    // ⁡⁣⁣⁢Increment author's reputataion by +1/-1⁡⁡ for downvoting and revoking respectivly
    await UserModel.findByIdAndUpdate(userId, {
      $inc: { reputation: hasdownVoted ? -1 : 1 }, // if already upvoted and then clicking it again to revoke the vote then '-1' else '+1'
    });

    // ⁡⁣⁣⁢Increment author's reputation by +10/-10⁡ for recieving an upvote/downvote to the question
    await UserModel.findByIdAndUpdate(question.author, {
      $inc: { reputation: hasdownVoted ? -10 : 10 },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//   ⁡⁣⁢⁣Delete Question⁡
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

//   ⁡⁣⁢⁣Edit Question⁡
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

//   ⁡⁣⁢⁣Get Hot Question⁡
export async function getHotQuestions() {
  try {
    connectToDatabase();

    const hotQuestions = await QuestionModel.find({}) // get all questions
      .sort({ views: -1, upvotes: -1 }) // 𝘴𝘩𝘰𝘸 𝘛𝘰𝘱 𝘷𝘪𝘦𝘸𝘦𝘥 & 𝘶𝘱𝘷𝘰𝘵𝘦𝘥 𝘰𝘯 𝘵𝘰𝘱
      /* `⁡⁣⁢⁣𝘀𝗼𝗿𝘁:⁡` will make newly create question appear on top of other questions instead of in the bottom for example:
      ⁡⁣⁣⁢without sort⁡ ⁡⁢⁢⁢=>⁡ ⁡⁣⁣⁢1. Old question ⁡                      ⁡⁢⁣⁣with sort⁡ ⁡⁢⁢⁢=>⁡ ⁡⁢⁣⁣1. Newly created Question⁡    
                      ⁡⁣⁣⁢2. Newly Created question  ⁡                        ⁣2. Old question⁡
      
      */
      .limit(5); // l𝘪𝘮𝘪𝘵 𝘵𝘩𝘦 𝘯𝘶𝘮𝘣𝘦𝘳 𝘰𝘧 𝘲𝘶𝘦𝘴𝘵𝘪𝘰𝘯𝘴 𝘵𝘰 5

    return hotQuestions;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//   ⁣Recommended Questions⁡
export async function getRecommendedQuestions(params: RecommendedParams) {
  try {
    await connectToDatabase();

    const { userId, page = 1, pageSize = 8, searchQuery } = params;

    // find user
    const user = await UserModel.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("user not found");
    }

    const skipAmount = (page - 1) * pageSize;

    // Find the user's Interactions
    const userInteractions = await InteractionModel.find({ user: user._id })
      .populate("tags")
      .exec();

    // Extract tags from user's interactions
    const userTags = userInteractions.reduce((tags, interaction) => {
      if (interaction.tags) {
        tags = tags.concat(interaction.tags);
      }

      return tags;
    }, []);

    // Get distinct tag IDs from user's interactions
    const distinctUserTagIds = [
      // @ts-ignore
      ...new Set(userTags.map((tag: any) => tag._id)),
    ];

    const query: FilterQuery<typeof QuestionModel> = {
      $and: [
        { tags: { $in: distinctUserTagIds } }, // Questions with user's tags
        {
          author: {
            $ne: user._id,
          },
        }, // Exclude user's own questions
      ],
    };

    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { content: { $regex: searchQuery, $options: "i" } },
      ];
    }

    const totalQuestions = await QuestionModel.countDocuments(query);

    const recommendedQuestions = await QuestionModel.find(query)
      .populate({
        path: "tags",
        model: TagModel,
      })
      .populate({
        path: "author",
        model: UserModel,
      })
      .skip(skipAmount)
      .limit(pageSize);

    const isNext = totalQuestions > skipAmount + recommendedQuestions.length;

    return { questions: recommendedQuestions, isNext };
  } catch (error) {
    console.error("Error getting recommended questions", error);
    throw error;
  }
}
