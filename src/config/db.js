const mongoose = require("mongoose");
const { PROD_DB_URI, NODE_ENV, LOCAL_DB_URI } = require("./env");

const connectToDatabase = async () => {
  const dbURI = NODE_ENV === "production" ? PROD_DB_URI : LOCAL_DB_URI;

  try {
    await mongoose.connect(dbURI);
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
