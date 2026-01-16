const { body } = require("express-validator");
const validateRequest = require("../../../shared/middlewares/validateRequest.middleware");

exports.createUserValidator = [
  body("name").notEmpty().withMessage("User must have a name"),
  body("email")
    .notEmpty()
    .withMessage("User must have an email")
    .isEmail()
    .withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .withMessage("User must have a password")
    .isLength({ min: 10 })
    .withMessage("Password must be more than 10 characters"),
  validateRequest,
];
