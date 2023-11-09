const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
module.exports = {
  secret: process.env.secret || "thisIsSecretKey",
  expiresIn: 3600, // 1h
  notBefore: 0, // 5sec
  refreshSecret: process.env.refreshSecret || "thisIsSecretKeyRefresh",
  refreshExpiresIn: 86400, // 1d
  maxTokenRefreshCount: 10, // repeatt
};
