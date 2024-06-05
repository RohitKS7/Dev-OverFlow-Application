import { Schema, models, model, Document } from "mongoose";

export interface IAnswer extends Document {
  author: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
  content: string;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const AnswerSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
  question: {
    type: Schema.Types.ObjectId,
    ref: "QuestionModel",
    required: true,
  },
  content: { type: String, required: true },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "UserModel" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "UserModel" }],
  createdAt: { type: Date, default: Date.now },
});

const AnswerModel = models.AnswerModel || model("AnswerModel", AnswerSchema);

export default AnswerModel;
