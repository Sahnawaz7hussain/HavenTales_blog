const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "can't be empty!"],
    },
    email: {
      type: String,
      required: [true, "can't be empty!"],
      unique: [true, "Duplicate email!"],
    },
    password: {
      type: String,
      required: [true, "can't be empty!"],
    },
    profilePic: {
      type: String,
      default:
        "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png",
    },
    bio: { type: String, default: "Bio not added!" },
  },
  { timestamps: true, versionKey: false }
);

const UserModel = mongoose.model("user", userSchema);
module.exports = { UserModel };
