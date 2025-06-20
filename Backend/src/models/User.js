import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    avatar: {
      type: String,
    },
    
    role:{
      type: String,
      default: 'user',
      enum: ['user', 'admin']

    },
    favourites:[{
      type: mongoose.Types.ObjectId,
      ref: "books"
    }]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
