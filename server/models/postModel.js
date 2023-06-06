const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title can't be empty!"],
      unique: [true, "Duplicate post title"],
    },
    desc: {
      type: String,
      required: [true, "Description can't be empty!"],
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: [true, "Username can't empty!"],
    },
    categories: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("post", PostSchema);
module.exports = { PostModel };
