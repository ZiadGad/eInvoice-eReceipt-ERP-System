const axios = require("axios");
const { ETA_BASE_URL } = require("../../../config/env");
const { getEtaAccessToken } = require("./etaToken.service");

exports.submitInvoiceToEta = async (issuer, payload) => {
  try {
    const token = await getEtaAccessToken(issuer);

    const response = await axios.post(
      `https://api.preprod.invoicing.eta.gov.eg/api/v1/documentsubmissions`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data.rejectedDocuments[0]?.error);
    return response.data;
  } catch (err) {
    console.log("catchErr", err);
    throw new Error("Failed to submit invoice to ETA");
  }
};
