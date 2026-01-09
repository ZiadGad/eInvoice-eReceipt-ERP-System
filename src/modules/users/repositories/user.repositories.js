const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");

exports.create = asyncHandler(async (userData) => {
  const user = await User.create(userData);
  return user;
});
