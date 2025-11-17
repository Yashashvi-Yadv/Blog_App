import mongoose from "mongoose";

const FollowSchema = new mongoose.Schema(
  {
    followerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    followingId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// prevent duplicate follow
FollowSchema.index({ followerId: 1, followingId: 1 }, { unique: true });

export default mongoose.model("Follow", FollowSchema);
