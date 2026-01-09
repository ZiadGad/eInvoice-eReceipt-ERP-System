const authRouter = require("./modules/auth/routes");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the API" });
  });

  app.use("/api/v1.0/auth", authRouter);

  app.use((req, res, next) => {
    res.status(404).json({ error: "Route Not Found" });
  });
};
