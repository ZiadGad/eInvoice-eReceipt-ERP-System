const ApiError = require("../../../shared/errors/ApiError");
const userRepo = require("../../users/repositories/user.repositories");
const { verifyAccessToken } = require("../utils/jwt");
const asyncHandler = require("express-async-handler");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ApiError("Not authorized, no token", 401));
  }
  const decoded = verifyAccessToken(token);
  console.log(decoded);
  req.user = await userRepo.findById(decoded.id);
  if (!req.user) {
    return next(
      new ApiError("The user belonging to this token no longer exists", 401)
    );
  }
  next();
});
