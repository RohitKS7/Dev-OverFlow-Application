import { Schema, models, model, Document } from "mongoose";

//   Define TypeScript interface for User Model
export interface IUser extends Document {
  // we have to make connection between `clerkID` of user and the `ID` of user in database
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture: string;
  location?: string;
  protfolioWebsite?: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}

//   Define the schema
const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  bio: { type: String },
  picture: { type: String, required: true },
  location: { type: String },
  portfolioWebsite: { type: String },
  reputation: { type: Number, default: 0 },
  saved: [{ type: Schema.Types.ObjectId, ref: "QuestionModel" }], // Assuming 'Question' is the model name you've defined previously
  joinedAt: { type: Date, default: Date.now },
});

//   Create the model
const UserModel = models.UserModel || model("UserModel", UserSchema);

export default UserModel;
