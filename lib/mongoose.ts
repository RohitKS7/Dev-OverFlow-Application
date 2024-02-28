import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  // prevent unknown field queries
  mongoose.set("strictQuery", true);

  //   Checking if the connection URL is present in env.local?
  if (!process.env.MONGODB_URL) {
    return console.log("Missing MONGODB_URL");
  }

  // Checking if our database is connnected?
  if (isConnected) {
    return console.log("MongoDB is already connected");
  }

  //  Connect to MongoDB Atlas Database
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devoverflow",
    });

    isConnected = true;

    console.log("MongoDB is connected");
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
};
