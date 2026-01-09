const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");

exports.create = asyncHandler(async (userData) => {
  const user = await User.create(userData);
  return user;
});

exports.findByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

exports.findById = async (id) => {
  const user = await User.findById(id);
  return user;
};
