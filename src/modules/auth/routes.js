const express = require("express");
const authRouter = express.Router();
const authController = require("./controllers/auth.controllers");
const {
  loginValidator,
  refreshTokenValidator,
} = require("./validators/auth.validator");

authRouter.post("/login", loginValidator, authController.login);

authRouter.post(
  "/refresh-token",
  refreshTokenValidator,
  authController.refreshToken
);

module.exports = authRouter;
