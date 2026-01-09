const authServices = require("../services/auth.services");
const asyncHandler = require("express-async-handler");
const { verifyRefreshToken } = require("../utils/jwt");

// @desc - Login user
// @route - POST api/v1.0/auth/login
// @Access - Public

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { refreshToken, accessToken } = await authServices.login(
    email,
    password
  );
  res.status(200).json({
    status: "success",
    accessToken,
    refreshToken,
  });
});

// @desc - Refresh user token
// @route - POST api/v1.0/auth/refresh-token
// @Access - Public

exports.refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  const newAccessToken = await authServices.refreshAccessToken(refreshToken);
  res.status(200).json({
    status: "success",
    accessToken: newAccessToken,
  });
});
