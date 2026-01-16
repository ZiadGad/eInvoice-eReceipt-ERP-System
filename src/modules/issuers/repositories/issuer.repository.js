const Issuer = require("../models/issuer.model");

exports.create = async (issuerData) => {
  const issuer = await Issuer.create(issuerData);
  return issuer;
};

exports.findById = async (id) => {
  return await Issuer.findById(id);
};
