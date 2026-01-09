const express = require("express");
const cors = require("cors");
const { NODE_ENV } = require("./config/env");
const mountRoutes = require("./routes");
const globalErrorHandler = require("./shared/middlewares/error.middleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

if (NODE_ENV === "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

// Routes
mountRoutes(app);

// Error Handling
app.use(globalErrorHandler);
module.exports = app;
