import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    otp: { type: String },
    otpExpire: { type: Date },
    profilePic: {
      type: String,
      default: "https://res.cloudinary.com/default-profile-pic.png",
    },
    dob:{type:Date,default:"",required:false},
    bio: { type: String, default: "" },
    website: { type: String, default: "" },

    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followRequests:[ {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }],
  notifications: [
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String }, // followRequest, like, comment etc.
  message: { type: String },
  profilePic: { type: String }, // 👈 add this field
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
  },
],

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
