const express = require("express");
const { register, login } = require("../controllers/authController");

const authRouter = express.Router();

//REGISTER
authRouter.post("/register", register);

//LOGIN
authRouter.post("/login", login);

module.exports = { authRouter };
