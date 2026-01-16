const mongoose = require("mongoose");
const { Schema } = mongoose;

const issuerSchema = new Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ["B"],
    default: "B",
  },
  registrationNumber: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  taxpayerActivityCode: {
    type: String,
    required: true,
    trim: true,
  },
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
  etaConfig: {
    clientId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    clientSecret: {
      type: String,
      required: true,
      trim: true,
      // select: false,
    },
    etaAccessToken: {
      type: String,
      trim: true,
      // select: false,
    },
    etaAccessTokenExpiresAt: {
      type: Date,
    },
  },
});

const Issuer = mongoose.model("Issuer", issuerSchema);
module.exports = Issuer;
