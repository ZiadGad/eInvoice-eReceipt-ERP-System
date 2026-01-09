const User = require("../../users/models/user.model");
const asyncHandler = require("express-async-handler");

exports.findByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

exports.findById = async (id) => {
  const user = await User.findById(id);
  return user;
};
