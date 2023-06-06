const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name can't be empty!"],
      unique: [true, "Duplicate category name."],
    },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("category", CategorySchema);
module.exports = { CategoryModel };
