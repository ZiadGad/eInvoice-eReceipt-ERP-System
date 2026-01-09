const { seedUsers } = require("./user/user.seed");
const { user } = require("./user/user.data");
const connectToDatabase = require("../../src/config/db");

connectToDatabase();

const mount = async () => {
  switch (process.argv[2]) {
    case "user":
      await seedUsers(user);
      process.exit(0);
      break;
    default:
      console.log("No valid seed option provided.");
  }
};
mount();
