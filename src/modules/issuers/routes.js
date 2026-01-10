const express = require("express");
const issuerRouter = express.Router();
const issuerController = require("./controllers/issuer.controller");
const {
  createIssuerValidator,
  assignIssuerValidator,
} = require("./validators/issuer.validator");
const { protect, restrictTo } = require("../auth/middlewares/auth.middlewares");

issuerRouter.post(
  "/",
  protect,
  restrictTo("admin"),
  createIssuerValidator,
  issuerController.createIssuer
);
issuerRouter.post(
  "/assign-user",
  protect,
  restrictTo("admin"),
  assignIssuerValidator,
  issuerController.assignIssuer
);
module.exports = issuerRouter;
