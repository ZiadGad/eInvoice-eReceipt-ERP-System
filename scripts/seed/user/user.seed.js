const userService = require("../../../src/modules/users/services/user.services");

exports.seedUsers = async (user) => {
  try {
    await userService.register(user);
    console.log("User seeding completed.");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};
