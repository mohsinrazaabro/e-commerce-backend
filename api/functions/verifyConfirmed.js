require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

function verifyConfirmed(req, res, next) {
  const bearerHeaders = req.headers["authorization"];
  if (bearerHeaders !== "undefined") {
    const bearerToken = bearerHeaders.split(" ")[1];
    jwt.verify(bearerToken, process.env.SECRET_JWT_KEY, (err, authData) => {
      if (err)
        return res.json({
          message: "error occured at verification",
          success: false,
        });
      req.authData = authData;
      userModel.findOne({ username: req.authData.name }, (err, user) => {
        if (!user.isconfirmed) {
          return res.json({
            message: `Please confirm your account first!`,
            success: false,
          });
        }
      });

      next();
    });
  }
}

module.exports = verifyConfirmed;
