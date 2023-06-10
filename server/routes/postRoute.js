const express = require("express");
const {
  createNewPost,
  updatePost,
  deletePost,
  getPostById,
  allPosts,
} = require("../controllers/postController");
const { authentication } = require("../middleware/authentication");

const postRouter = express.Router();
//CREATE POST
postRouter.post("/", authentication, createNewPost);

//UPDATE POST
postRouter.put("/:id", authentication, updatePost);

//DELETE POST
postRouter.delete("/:id", authentication, deletePost);

//GET POST BY ID
postRouter.get("/:id", getPostById);

//GET ALL POSTS
postRouter.get("/", allPosts);

//

module.exports = { postRouter };
