import { Schema, models, model, Document } from "mongoose";

//   Define TypeScript interface for Question Model
//   extends allows us to access the properties of Document
export interface IQuestion extends Document {
  title: string;
  content: string;
  //   tags type will be a reference to another model in our database, which means a connection to that model in our database
  tags: Schema.Types.ObjectId[];
  views: number;
  //   model of users who upvoted the post
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  //   author is not an array since the creator of an post can only be one person
  author: Schema.Types.ObjectId;
  answers: Schema.Types.ObjectId[];
  createdAt: Date;
}

//   Define the schema
const QuestionSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  //   Referncing to Tag model Assuming 'Tag' is the name of the related model
  tags: [{ type: Schema.Types.ObjectId, ref: "TagModel" }],
  views: { type: Number, default: 0 },
  //   An Array of ID of users that upvotes this Assuming 'User' is the name of the related model
  upvotes: [{ type: Schema.Types.ObjectId, ref: "UserModel" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "UserModel" }],
  author: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
  answers: [{ type: Schema.Types.ObjectId, ref: "AnswerModel" }],
  createdAt: { type: Date, default: Date.now },
});

//   Create the model
//   `models.QuestionModel` checking if Model already exist? if not than create one
const QuestionModel =
  models.QuestionModel || model("QuestionModel", QuestionSchema);

export default QuestionModel;
