const app = require("./app");
const connectToDatabase = require("./config/db");
const { PORT, NODE_ENV } = require("./config/env");

connectToDatabase();

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}.\nWe are in ${NODE_ENV} mode.`
  );
});
