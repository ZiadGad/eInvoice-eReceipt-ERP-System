require("dotenv").config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";
const LOCAL_DB_URI =
  process.env.LOCAL_DB_URI || "mongodb://localhost:27017/eta-erp";
const PROD_DB_URI = process.env.PROD_DB_URI;
const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "default_jwt_secret";
const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN || "15m";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "default_refresh_jwt_secret";
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || "3d";
const ETA_BASE_URL =
  process.env.ETA_BASE_URL || "https://api.preprod.invoicing.eta.gov.eg";
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

module.exports = {
  PORT,
  NODE_ENV,
  LOCAL_DB_URI,
  PROD_DB_URI,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
  ETA_BASE_URL,
  CLIENT_ID,
  CLIENT_SECRET,
};
