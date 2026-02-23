import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    author: {
      ref: "User",
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    category: {
      ref: "Category",
      type: mongoose.Schema.Types.ObjectId,
    },
    description: {
      required: [true, "mô tả là bắt buộc"],
      type: String,
    },
    favoriteBlogsByUser: [
      {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    image: {
      type: String,
    },
    likes: {
      default: 0,
      type: Number,
    },
    likes_users: [
      {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    title: {
      required: [true, "tiêu đề là bắt buộc"],
      trim: true,
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
