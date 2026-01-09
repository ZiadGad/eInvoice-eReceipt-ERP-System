const express = require("express");
const userRouter = express.Router();
const userController = require("./controllers/user.controller");
const { protect } = require("../auth/middlewares/auth.middlewares");
const { createUserValidator } = require("./validators/user.validator");

// Private Routes
userRouter.post(
  "/create-user",
  protect,
  createUserValidator,
  userController.createUser
);
module.exports = userRouter;
