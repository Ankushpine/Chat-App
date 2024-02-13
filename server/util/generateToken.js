const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly : true,  // Prevent XSS attacks means cros-site scripting attacks
    sameSite : "strict",  // Prevent CSFR attacks 
    secure: process.env.NODE_ENV !== "development" // false in development true in production
  });

  return token;

};

module.exports = generateTokenAndSetCookie;