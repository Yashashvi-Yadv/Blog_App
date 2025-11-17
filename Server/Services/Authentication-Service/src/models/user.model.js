// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      index: true, // helps fast lookups for Google login
      unique: true,
      sparse: true, // allows null for non-Google users
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    picture: {
      type: String, // Google profile image URL
      default: "",
    },
    totalPosts: { type: Number, default: 0 },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
    versionKey: false,
  }
);

userSchema.index({ email: 1 }); 
userSchema.index({ googleId: 1 });

export default mongoose.model("User", userSchema);
