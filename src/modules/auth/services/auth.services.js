const ApiError = require("../../../shared/errors/ApiError");
const authRepo = require("../repositories/auth.repository");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");
const asyncHandler = require("express-async-handler");

exports.login = async (email, password) => {
  console.log(email);
  const user = await authRepo.findByEmail(email);
  console.log(user);
  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new ApiError("Invalid email or password", 401);
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

exports.refreshAccessToken = async (refreshToken) => {
  let decoded = verifyRefreshToken(refreshToken);

  const user = await authRepo.findById(decoded.id);

  if (!user || user.refreshToken !== refreshToken) {
    throw new ApiError("Invalid refresh token", 401);
  }

  const newAccessToken = generateAccessToken(user);
  return newAccessToken;
};
