import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    action: {
      enum: [
        "create_blog",
        "update_blog",
        "delete_blog",
        "create_category",
        "update_category",
        "delete_category",
      ],
      required: true,
      type: String,
    },
    actionText: {
      required: true,
      type: String,
    },
    admin: {
      ref: "User",
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    details: {
      blogId: {
        ref: "Blog",
        type: mongoose.Schema.Types.ObjectId,
      },
      categoryId: {
        ref: "Category",
        type: mongoose.Schema.Types.ObjectId,
      },
      title: String,
    },
  },
  {
    timestamps: true,
  },
);

// Index để tăng tốc độ truy vấn
activitySchema.index({ createdAt: -1 });
activitySchema.index({ admin: 1 });

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
