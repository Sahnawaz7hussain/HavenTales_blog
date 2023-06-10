const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title can't be empty!"],
      unique: [true, "Duplicate post title"],
      maxLength: [50, "Maximum length shuld be 50 charts"],
    },
    desc: {
      type: String,
      required: [true, "Description can't be empty!"],
    },
    photo: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, " can't empty!"],
    },
    category: {
      type: String,
      required: false,
      default: "other",
    },
  },
  { timestamps: true, versionKey: false }
);

const PostModel = mongoose.model("post", PostSchema);
module.exports = { PostModel };
