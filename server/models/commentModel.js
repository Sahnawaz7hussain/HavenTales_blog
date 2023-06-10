const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "can't be empty!"],
    },
    comment: { type: String, required: [true, "can't be empty!"] },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "can't be empty!"],
    },
  },
  { timeseries: true, versionKey: false }
);

const CommentModel = mongoose.model("comment", commentSchema);

module.exports = { CommentModel };
