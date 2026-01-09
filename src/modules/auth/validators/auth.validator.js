const { body } = require("express-validator");
const validateRequest = require("../../../shared/middlewares/validateRequest.middleware");

exports.loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  validateRequest,
];

exports.refreshTokenValidator = [
  body("refreshToken").notEmpty().withMessage("Refresh token is required"),
  validateRequest,
];
