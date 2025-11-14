import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
    versionKey: false,
  }
);

blogSchema.index({ userid: 1 });

export default mongoose.model("Blog", blogSchema);
