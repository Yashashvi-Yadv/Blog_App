import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export async function ConnectDb() {
  try {
    console.log(process.env.URI);
    const conn = await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10s timeout for connection
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // Stop the app if DB fails
  }
}
