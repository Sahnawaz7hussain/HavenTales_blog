const { CommentModel } = require("../models/commentModel");

// create comment
const createNewComment = async (req, res) => {
  try {
    const newComment = new CommentModel(req.body);
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// update comment
const updateComment = async (req, res) => {
  const updateId = req.params.id;
  const userId = req.body.userId;
  try {
    const comment = await CommentModel.findById(updateId);
    if (userId == comment.userId) {
      try {
        const updatedComment = await CommentModel.findByIdAndUpdate(
          updateId,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedComment);
      } catch (err) {
        res.status(500).json(err.message);
      }
    } else {
      res.status(401).json("You can only update your post!");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// delete comment
const deleteComment = async (req, res) => {
  const deleteId = req.params.id;
  try {
    const comment = await CommentModel.findById(deleteId);
    if (req.body.userId == comment.userId) {
      try {
        await CommentModel.findByIdAndDelete(deleteId);
        res.status(200).json("Comment has been deleted...");
      } catch (err) {
        res.status(500).json(err.message);
      }
    } else {
      res.status(401).json("You can delete only your comment!");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// get comments of specific post
const getComments = async (req, res) => {
  const postId = req.params.postId;
  try {
    const comments = await CommentModel.find({ post: postId }).populate(
      "userId",
      "name"
    );
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  createNewComment,
  updateComment,
  deleteComment,
  getComments,
};
