const express = require("express");
const {
  createNewPost,
  updatePost,
  deletePost,
  getPostById,
  allPosts,
} = require("../controllers/postController");

const postRouter = express.Router();
//CREATE POST
postRouter.post("/", createNewPost);

//UPDATE POST
postRouter.put("/:id", updatePost);

//DELETE POST
postRouter.delete("/:id", deletePost);

//GET POST BY ID
postRouter.get("/:id", getPostById);

//GET ALL POSTS
postRouter.get("/", allPosts);

//

module.exports = { postRouter };
