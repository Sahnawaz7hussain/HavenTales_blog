const express = require("express");
const {
  createNewComment,
  updateComment,
  deleteComment,
  getComments,
} = require("../controllers/commentController");
const { authentication } = require("../middleware/authentication");

const commentRouter = express.Router();

// all Comment
commentRouter.get("/:postId", getComments);

commentRouter.use(authentication);
// create new Comment
commentRouter.post("/", createNewComment);

// update Comment
commentRouter.patch("/:id", updateComment);

// delete Comment
commentRouter.delete("/:id", deleteComment);

module.exports = { commentRouter };
