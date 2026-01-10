const express = require("express");
const invoiceRouter = express.Router();
const invoiceController = require("./controllers/invoice.controller");
const { protect, restrictTo } = require("../auth/middlewares/auth.middlewares");

invoiceRouter.post(
  "/",
  protect,
  restrictTo("issuer"),
  invoiceController.createAndSubmitInvoice
);

module.exports = invoiceRouter;
