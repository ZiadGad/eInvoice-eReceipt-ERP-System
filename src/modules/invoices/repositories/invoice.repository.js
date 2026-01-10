const Invoice = require("../models/invoice.model");

exports.create = async (invoiceData) => {
  const invoice = await Invoice.create(invoiceData);
  return invoice;
};
