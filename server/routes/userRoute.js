const express = require("express");

const {
  updateUser,
  deleteUser,
  getUserById,
} = require("../controllers/userController");
const { authentication } = require("../middleware/authentication");

const userRouter = express.Router();
//UPDATE
userRouter.put("/:id", authentication, updateUser);

//DELETE
userRouter.delete("/:id", authentication, deleteUser);

//GET USER
userRouter.get("/:id", authentication, getUserById);

module.exports = { userRouter };
