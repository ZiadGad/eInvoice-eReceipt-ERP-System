const axios = require("axios");
const {
  ETA_BASE_URL,
  CLIENT_ID,
  CLIENT_SECRET,
} = require("../../../config/env");
const ApiError = require("../../../shared/errors/ApiError");

exports.loginToEta = async (issuer) => {
  try {
    const response = await axios.post(
      `${ETA_BASE_URL}/connect/token`,
      {
        client_id: issuer.etaConfig.clientId,
        client_secret: issuer.etaConfig.clientSecret,
        grant_type: "client_credentials",
        scope: "InvoicingAPI",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return {
      accessToken: response.data.access_token,
      expiresIn: response.data.expires_in,
    };
  } catch (err) {
    console.log(err);
    throw new ApiError("Failed to login to ETA", 500);
  }
};
