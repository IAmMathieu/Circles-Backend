require("dotenv").config();
express = require("express");
const jwt = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");

const jwbtoken = {
  jwtOptions: {
    algorithm: "HS256",
    expiresIn: "1h",
  },

  generateAccessToken(id) {
    return jsonwebtoken.sign(
      { userId: id },
      process.env.JWTSECRET,
      this.jwtOptions
    );
  },

  authenticateToken() {},
};

module.exports = jwbtoken;
