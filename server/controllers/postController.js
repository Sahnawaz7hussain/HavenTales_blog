const { PostModel } = require("../models/postModel");

// create post
const createNewPost = async (req, res) => {
  const newPost = new PostModel(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// update post
const updatePost = async (req, res) => {
  const updateId = req.params.id;
  const userId = req.body.userId;
  try {
    const post = await PostModel.findById(updateId).populate("userId", "name");
    if (userId == post.userId._id) {
      try {
        const updatedPost = await PostModel.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can only update your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete post
const deletePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (req.body.userId == post.userId) {
      try {
        await PostModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// get post by id
const getPostById = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id).populate(
      "userId",
      "name"
    );
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get all posts
const allPosts = async (req, res) => {
  const user = req.query.user;
  const category = req.query.category;
  console.log("user: ", user);
  try {
    let posts;
    if (user) {
      posts = await PostModel.find({ userId: user }).populate("userId", "name");
    } else if (category) {
      posts = await PostModel.find({
        category: category,
      }).populate("userId", "name");
    } else {
      posts = await PostModel.find().populate("userId", "name");
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createNewPost,
  updatePost,
  deletePost,
  getPostById,
  allPosts,
};
