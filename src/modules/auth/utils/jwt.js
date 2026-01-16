const jwt = require("jsonwebtoken");
const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
} = require("../../../config/env");

exports.generateAccessToken = (user) =>
  jwt.sign(
    { id: user.id, role: user.role, issuer: user.issuer },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    }
  );

exports.generateRefreshToken = (user) =>
  jwt.sign({ id: user.id, role: user.role }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });

exports.verifyAccessToken = (token) => jwt.verify(token, ACCESS_TOKEN_SECRET);

exports.verifyRefreshToken = (token) => jwt.verify(token, REFRESH_TOKEN_SECRET);
