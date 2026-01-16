const { body } = require("express-validator");
const validateRequest = require("../../../shared/middlewares/validateRequest.middleware");

exports.createIssuerValidator = [
  body("companyName").notEmpty().withMessage("Company name is required"),
  body("registrationNumber")
    .notEmpty()
    .withMessage("Registration number is required"),
  body("taxpayerActivityCode")
    .notEmpty()
    .withMessage("Taxpayer activity code is required"),
  body("type").optional().isIn(["B"]).withMessage("Type must be 'B'"),

  body("address").notEmpty().withMessage("Address is required"),
  body("address.branchID").notEmpty().withMessage("Branch ID is required"),
  body("address.country").notEmpty().withMessage("Country is required"),
  body("address.governate").notEmpty().withMessage("Governate is required"),
  body("address.regionCity").notEmpty().withMessage("Region/City is required"),
  body("address.street").notEmpty().withMessage("Street is required"),
  body("address.postalCode").notEmpty().withMessage("Postal code is required"),
  body("address.buildingNumber").optional(),
  body("address.floor").optional(),
  body("address.room").optional(),
  body("address.landmark").optional(),
  body("address.additionalInformation").optional(),

  body("etaConfig").notEmpty().withMessage("ETA Config is required"),
  body("etaConfig.clientId")
    .notEmpty()
    .withMessage("ETA Config clientId is required"),
  body("etaConfig.clientSecret")
    .notEmpty()
    .withMessage("ETA Config clientSecret is required"),
  validateRequest,
];

exports.assignIssuerValidator = [
  body("issuerId").notEmpty().withMessage("Issuer ID is required"),
  body("userId").notEmpty().withMessage("User ID is required"),
  validateRequest,
];
