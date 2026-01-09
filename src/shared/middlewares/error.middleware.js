const { NODE_ENV } = require("../../config/env");
const ApiError = require("../errors/ApiError");

// MongoDB/Mongoose Errors

// CastError happens when invalid id is provided
const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new ApiError(message, 400);
};

//  ValidationError happens when data validation fails - missing required fields, wrong data types, etc.
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new ApiError(message, 400);
};

// Duplicate Key Error happens when unique field value is duplicated
const handleDuplicateFields = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new ApiError(message, 400);
};

// JWT Errors

// Invalid JWT Token
const handleJWTError = () =>
  new ApiError("Invalid token. Please log in again!", 401);

// Expired JWT Token
const handleJWTExpiredError = () =>
  new ApiError("Your token has expired! Please log in again.", 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log("Error", err);

    res.status(500).json({
      status: "error",
      message: "something went very wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "error";

  if (NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (NODE_ENV === "production") {
    let error = Object.create(err);

    if (error.name === "CastError") error = handleCastError(error);
    if (error.name === "ValidationError") error = handleValidationError(error);
    if (error.code === 11000) error = handleDuplicateFields(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
    sendErrorProd(error, res);
  }
};
