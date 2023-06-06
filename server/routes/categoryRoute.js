const express = require("express");
const {
  postNewCategory,
  allCategory,
} = require("../controllers/categoryController");

const categoryRouter = express.Router();

// POST NEW CATEGORY
categoryRouter.post("/", postNewCategory);

// GET ALL CATEGORY
categoryRouter.get("/", allCategory);

module.exports = { categoryRouter };
