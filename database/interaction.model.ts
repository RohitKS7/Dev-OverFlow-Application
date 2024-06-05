import { Schema, models, model, Document } from "mongoose";

export interface IInteraction extends Document {
  user: Schema.Types.ObjectId;
  action: string; // view, upvotes, downvotes, follow etc.
  question: Schema.Types.ObjectId;
  answer: Schema.Types.ObjectId;
  tags: Schema.Types.ObjectId[];
  createdAt: Date;
}

const InteractionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
  action: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, ref: "QuestionModel" },
  answer: { type: Schema.Types.ObjectId, ref: "AnswerModel" },
  tags: [{ type: Schema.Types.ObjectId, ref: "TagModel" }],
  createdAt: { type: Date, default: Date.now },
});

const InteractionModel =
  models.InteractionModel || model("InteractionModel", InteractionSchema);

export default InteractionModel;
