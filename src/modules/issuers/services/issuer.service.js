const ApiError = require("../../../shared/errors/ApiError");
const { mapIssuerInput } = require("../mappers/issuer.mapper");
const issuerRepo = require("../repositories/issuer.repository");
const userRepo = require("../../users/repositories/user.repositories");

exports.createIssuer = async (issuer) => {
  const mappedIssuer = mapIssuerInput(issuer);
  const newIssuer = await issuerRepo.create(mappedIssuer);
  return newIssuer;
};

exports.assignIssuerToUser = async (issuerId, userId) => {
  const user = await userRepo.findById(userId);
  if (!user) {
    throw new ApiError("User not found/Invalid user id", 404);
  }
  if (user.role !== "issuer") {
    throw new ApiError("Only issuer users can be assigned", 400);
  }
  if (user.issuer) {
    throw new ApiError("User already assigned to an issuer", 400);
  }
  const issuer = await issuerRepo.findById(issuerId);
  if (!issuer) {
    throw new ApiError("Issuer not found/Invalid issuer id", 404);
  }

  user.issuer = issuerId;
  await user.save();

  return { userId: user.id, issuerId: issuer.id };
};
