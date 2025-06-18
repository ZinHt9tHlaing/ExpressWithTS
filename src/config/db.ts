import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB connected");
  } catch (error) {
    await mongoose.connection.on("error", (error: Error) => {
      console.error("DB connection error", error);
      process.exit(1);
    });
  }
};
