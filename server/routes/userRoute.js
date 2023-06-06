const express = require("express");

const {
  updateUser,
  deleteUser,
  getUserById,
} = require("../controllers/userController");

const userRouter = express.Router();
//UPDATE
userRouter.put("/:id", updateUser);

//DELETE
userRouter.delete("/:id", deleteUser);

//GET USER
userRouter.get("/:id", getUserById);

module.exports = { userRouter };
