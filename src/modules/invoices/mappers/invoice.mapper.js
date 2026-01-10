exports.buildEtaPayload = (invoice, issuer) => ({
  documents: [
    {
      issuer: {
        id: issuer.registrationNumber,
        name: issuer.companyName,
        type: issuer.type,
        address: issuer.address,
      },

      receiver: {
        id: invoice.receiver.registrationNumber,
        name: invoice.receiver.name,
        type: invoice.receiver.type,
        address: invoice.receiver.address,
      },

      documentType: invoice.documentType,
      documentTypeVersion: invoice.documentTypeVersion,
      dateTimeIssued: new Date(invoice.dateTimeIssued)
        .toISOString()
        .replace(/\.\d{3}Z$/, "Z"),
      taxpayerActivityCode: invoice.taxpayerActivityCode,
      internalID: invoice.internalID,

      invoiceLines: invoice.invoiceLines,

      totalSalesAmount: invoice.totalSalesAmount || 0,
      totalDiscountAmount: invoice.totalDiscountAmount || 0,
      totalItemsDiscountAmount: invoice.totalItemsDiscountAmount || 0,
      extraDiscountAmount: invoice.extraDiscountAmount || 0,
      netAmount: invoice.netAmount || 0,
      totalAmount: invoice.totalAmount || 0,
      taxTotals: invoice.taxTotals || [],
      signatures: [
        {
          signatureType: "I",
          value: "<Signature Value>",
        },
      ],
    },
  ],
});

exports.mapInvoiceToDB = (payload, issuerId, userId) => {
  return {
    issuer: issuerId,
    createdBy: userId,

    documentType: payload.documentType,
    documentTypeVersion: payload.documentTypeVersion || "0.9",

    internalID: payload.internalID,
    dateTimeIssued: payload.dateTimeIssued,

    taxpayerActivityCode: "8610",

    receiver: payload.receiver,

    purchaseOrderReference: payload.purchaseOrderReference,
    purchaseOrderDescription: payload.purchaseOrderDescription,

    salesOrderReference: payload.salesOrderReference,
    salesOrderDescription: payload.salesOrderDescription,

    proformaInvoiceNumber: payload.proformaInvoiceNumber,

    payment: payload.payment,
    delivery: payload.delivery,
    invoiceLines: payload.invoiceLines.map((line) => ({
      description: line.description,
      itemType: line.itemType,
      itemCode: line.itemCode,
      unitType: line.unitType,
      quantity: line.quantity,

      internalCode: line.internalCode,

      salesTotal: line.salesTotal || 0,
      total: line.total || 0,
      netTotal: line.netTotal || 0,
      valueDifference: line.valueDifference || 0,
      totalTaxableFees: line.totalTaxableFees || 0,
      itemsDiscount: line.itemsDiscount || 0,

      unitValue: line.unitValue,
      discount: line.discount || 0,
      taxableItems: line.taxableItems || [],
    })),

    totalSalesAmount: payload.totalSalesAmount || 0,
    totalDiscountAmount: payload.totalDiscountAmount || 0,
    totalItemsDiscountAmount: payload.totalItemsDiscountAmount || 0,
    extraDiscountAmount: payload.extraDiscountAmount || 0,
    netAmount: payload.netAmount || 0,
    totalAmount: payload.totalAmount || 0,

    taxTotals: payload.taxTotals,

    etaSubmission: {
      status: "Draft",
    },
  };
};
