const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/userModel");

const register = async (req, res) => {
  try {
    const isAlreadyUser = await UserModel.findOne({ email: req.body.email });
    if (isAlreadyUser) return res.status(409).json("user already exist");
    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(req.body.password, salt);
    const newUser = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
      bio: req.body.bio,
      profilePic: req.body.profilePic,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json("Account not found with given email!");

    const validated = bcrypt.compareSync(req.body.password, user.password);
    if (!validated) return res.status(400).json("Wrong Password!");

    const token = jwt.sign({ userId: user._id }, "secret");
    const { password, ...others } = user._doc;
    res.status(200).json({ token, user: others });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { register, login };
