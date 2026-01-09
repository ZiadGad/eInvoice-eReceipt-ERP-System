const asyncHandler = require("express-async-handler");
const userService = require("../services/user.services");

// @desc - Create a new user
// @route - POST api/v1.0/users/create-user
// @Access - Private (Admin)

exports.createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userService.register({ name, email, password });
  res.status(201).json({
    status: "success",
    data: user,
  });
});
