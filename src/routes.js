const authRouter = require("./modules/auth/routes");
const invoiceRouter = require("./modules/invoices/routes");
const issuerRouter = require("./modules/issuers/routes");
const userRouter = require("./modules/users/routes");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the API" });
  });

  app.use("/api/v1.0/auth", authRouter);
  app.use("/api/v1.0/users", userRouter);
  app.use("/api/v1.0/issuers", issuerRouter);
  app.use("/api/v1.0/invoices", invoiceRouter);

  app.use((req, res, next) => {
    res.status(404).json({ error: "Route Not Found" });
  });
};
