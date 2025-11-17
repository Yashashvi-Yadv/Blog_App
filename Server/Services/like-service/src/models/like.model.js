import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

LikeSchema.index({ blogId: 1, userId: 1 }, { unique: true });

export default mongoose.model("Likes", LikeSchema);
