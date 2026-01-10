const { loginToEta } = require("./etaAuth.service");

exports.getEtaAccessToken = async (issuer) => {
  if (
    issuer.etaConfig.etaAccessToken &&
    issuer.etaConfig.etaAccessTokenExpiry > Date.now()
  ) {
    return issuer.etaConfig.etaAccessToken;
  }

  const { accessToken, expiresIn } = await loginToEta(issuer);
  issuer.etaConfig.etaAccessToken = accessToken;
  issuer.etaConfig.etaAccessTokenExpiresAt = new Date(
    Date.now() + expiresIn * 1000
  );

  await issuer.save();

  return accessToken;
};
