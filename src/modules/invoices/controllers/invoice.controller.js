const asyncHandler = require("express-async-handler");
const invoiceService = require("../services/invoice.service");
const { mapInvoiceToDB } = require("../mappers/invoice.mapper");

exports.createAndSubmitInvoice = asyncHandler(async (req, res) => {
  const invoiceData = mapInvoiceToDB(req.body, req.user.issuer, req.user._id);
  const invoice = await invoiceService.createInvoice(invoiceData, req.user);
  res.status(201).json({
    status: "success",
    data: invoice,
  });
});
