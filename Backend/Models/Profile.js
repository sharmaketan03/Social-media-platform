import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },

    profilePic: {
      type: String,
      default: "https://res.cloudinary.com/default-profile-pic.png",
    },
    bio: { type: String, default: "" },
    website: { type: String, default: "" },

    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],

    isVerified: { type: Boolean, default: false },
    isPrivate: { type: Boolean, default: false },

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const UserAuth = mongoose.model("User", UserSchema);
export default UserAuth;
