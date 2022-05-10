require("dotenv").config();
// const { expressjwt: jwt } = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");

const jwbtoken = {
  jwtOptions: {
    algorithm: "HS256",
    expiresIn: "1d",
  },

  generateAccessToken(id) {
    return jsonwebtoken.sign(
      { userId: id },
      process.env.JWTSECRET,
      this.jwtOptions
    );
  },

  getAuthorization(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jsonwebtoken.verify(token, process.env.JWTSECRET, (err, userId) => {
      if (err) {
        return res.status(401).send("Unauthorized User");
      }
      req.userId = userId;
      next();
    });
  },
};

module.exports = jwbtoken;
