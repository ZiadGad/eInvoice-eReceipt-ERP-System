const asyncHandler = require("express-async-handler");

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userService.register({ name, email, password });
  res.status(201).json({
    status: "success",
    data: user,
  });
});
