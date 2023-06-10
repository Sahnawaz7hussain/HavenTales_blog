const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name can't be empty!"],
      unique: [true, "Duplicate category name."],
    },
  },
  { timestamps: true, versionKey: false }
);

const CategoryModel = mongoose.model("category", categorySchema);
module.exports = { CategoryModel };
