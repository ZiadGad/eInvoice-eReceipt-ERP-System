const issuerService = require("../services/issuer.service");
const asyncHandler = require("express-async-handler");

exports.createIssuer = asyncHandler(async (req, res) => {
  const issuerData = req.body;
  const issuer = await issuerService.createIssuer(issuerData);
  res.status(201).json({
    status: "success",
    data: issuer,
  });
});

exports.assignIssuer = asyncHandler(async (req, res) => {
  const { issuerId, userId } = req.body;
  const result = await issuerService.assignIssuerToUser(issuerId, userId);

  res.status(200).json({
    status: "success",
    message: `Issuer ${issuerId} assigned to user ${userId}`,
    data: result,
  });
});
