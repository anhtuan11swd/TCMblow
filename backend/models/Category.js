import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    blogs: [
      {
        ref: "Blog",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    description: {
      type: String,
    },
    name: {
      required: [true, "tên danh mục là bắt buộc"],
      trim: true,
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
