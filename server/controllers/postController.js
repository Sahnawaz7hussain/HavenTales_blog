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
  try {
    const post = await PostModel.findById(req.params.id);
    if (post.username === req.body.username) {
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
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete post
const deletePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        // wait for testing.it may work or may not work
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
    const post = await PostModel.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get all posts
const allPosts = async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await PostModel.find({ username });
    } else if (catName) {
      posts = await PostModel.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await PostModel.find();
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
