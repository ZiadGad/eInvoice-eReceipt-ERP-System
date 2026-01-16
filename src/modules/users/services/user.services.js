const userRepo = require("../repositories/user.repositories");
const asyncHandler = require("express-async-handler");

exports.register = asyncHandler(async (userData) => {
  const user = await userRepo.create(userData);
  return user;
});
