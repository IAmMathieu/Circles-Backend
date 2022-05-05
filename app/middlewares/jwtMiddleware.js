require("dotenv").config();
// const { expressjwt: jwt } = require("express-jwt");
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

  getAuthorization(req, res, next) {
    const authHeader = req.headers["authorization"];
    console.log(req.headers);
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);
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
