const mongoose = require("mongoose");
const { Schema } = mongoose;

const taxableItemSchema = new Schema(
  {
    taxType: String,
    subType: String,
    rate: Number,
    amount: Number,
  },
  { _id: false }
);

const invoiceLineSchema = new Schema(
  {
    description: String,
    itemType: String,
    itemCode: String,
    unitType: String,
    quantity: Number,

    internalCode: String,

    salesTotal: Number,
    total: Number,
    netTotal: Number,
    valueDifference: Number,
    totalTaxableFees: Number,
    itemsDiscount: Number,

    unitValue: {
      currencySold: String,
      amountEGP: Number,
    },

    discount: {
      rate: Number,
      amount: Number,
    },

    taxableItems: [taxableItemSchema],
  },
  { _id: false }
);

const invoiceSchema = new Schema(
  {
    issuer: {
      type: Schema.Types.ObjectId,
      ref: "Issuer",
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    documentType: {
      type: String,
      enum: ["I", "C", "D"], // Invoice / Credit / Debit
      required: true,
    },

    documentTypeVersion: {
      type: String,
      default: "0.9",
    },

    internalID: {
      type: String,
      required: true,
      unique: true,
    },

    dateTimeIssued: {
      type: Date,
      required: true,
    },

    taxpayerActivityCode: {
      type: String,
      required: true,
    },

    receiver: {
      name: { type: String, required: true },
      type: { type: String, enum: ["B", "P"], default: "B" },
      registrationNumber: { type: String, required: true },
      address: {
        branchID: {
          type: String,
          trim: true,
          required: true,
        },
        country: {
          type: String,
          trim: true,
          required: true,
        },
        governate: {
          type: String,
          trim: true,
          required: true,
        },
        regionCity: {
          type: String,
          trim: true,
          required: true,
        },
        street: {
          type: String,
          trim: true,
          required: true,
        },
        buildingNumber: {
          type: String,
          trim: true,
        },
        postalCode: {
          type: String,
          trim: true,
        },
        floor: {
          type: String,
          trim: true,
        },
        room: {
          type: String,
          trim: true,
        },
        landmark: {
          type: String,
          trim: true,
        },
        additionalInformation: {
          type: String,
          trim: true,
        },
      },
    },

    purchaseOrderReference: String,
    purchaseOrderDescription: String,

    salesOrderReference: String,
    salesOrderDescription: String,

    proformaInvoiceNumber: String,

    payment: {
      bankName: String,
      bankAddress: String,
      bankAccountNo: String,
      bankAccountIBAN: String,
      swiftCode: String,
      terms: String,
    },

    delivery: {
      approach: String,
      packaging: String,
      dateValidity: Date,
      exportPort: String,
      grossWeight: Number,
      netWeight: Number,
      terms: String,
    },

    invoiceLines: {
      type: [invoiceLineSchema],
      validate: [(v) => v.length > 0, "Invoice must have at least one line"],
    },

    totalSalesAmount: Number,
    totalDiscountAmount: Number,
    totalItemsDiscountAmount: Number,
    extraDiscountAmount: Number,
    netAmount: Number,
    totalAmount: Number,

    taxTotals: [
      {
        taxType: String,
        amount: Number,
        _id: false,
      },
    ],

    etaSubmission: {
      uuid: String,
      submissionId: String,
      status: {
        type: String,
        enum: ["Draft", "Submitted", "Accepted", "Rejected"],
        default: "Draft",
      },
      rejectedReasons: [String],
      submittedAt: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;
