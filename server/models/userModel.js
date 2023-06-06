const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "can't be empty!"],
      unique: [true, "Duplicate Username."],
    },
    email: {
      type: String,
      required: [true, "can't be empty!"],
      unique: [true, "Duplicate email."],
    },
    password: {
      type: String,
      required: [true, "can't be empty!"],
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", UserSchema);
module.exports = { UserModel };
