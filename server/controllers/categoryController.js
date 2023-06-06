const { CategoryModel } = require("../models/categoryModel");

// POST NEW CATEGORY
const postNewCategory = async (req, res) => {
  const newCat = new CategoryModel(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET ALL CATEGORY
const allCategory = async (req, res) => {
  try {
    const cats = await CategoryModel.find();
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { postNewCategory, allCategory };
