const { submitInvoiceToEta } = require("../../eta/services/eta.service");
const { buildEtaPayload } = require("../mappers/invoice.mapper");
const invoiceRepo = require("../repositories/invoice.repository");
const issuerRepo = require("../../issuers/repositories/issuer.repository");

exports.createInvoice = async (invoiceData, user) => {
  const issuer = await issuerRepo.findById(user.issuer);
  const invoice = await invoiceRepo.create(invoiceData);
  const etaPayload = buildEtaPayload(invoice, issuer);
  const etaInvoice = await submitInvoiceToEta(issuer, etaPayload);

  invoice.etaSubmission.submissionId = etaInvoice.submissionId;

  await invoice.save();
  console.log(etaInvoice);
  return invoice;
};
