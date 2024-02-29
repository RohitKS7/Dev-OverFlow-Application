import { Schema, models, model, Document } from "mongoose";

export interface ITag extends Document {
  name: string;
  description: string;
  // this are the questions with which the tags are connected to
  questions: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  createdOn: Date;
}

const TagSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "QuestionModel" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "UserModel" }],
  createdOn: { type: Date, default: Date.now },
});

const TagModel = models.TagModel || model("TagModel", TagSchema);

export default TagModel;
