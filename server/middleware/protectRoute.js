const jwt = require("jsonwebtoken");
const UserModel = require("../model/user-model");

require("dotenv").config();

const protectRoutes = async (req, res, next) => {
  try {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      console.log("1");
      return res.status(401).json({ error: "Unauthorized - No token" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      console.log("2");
      return res.status(401).json({ error: "Unauthorized - Can't Decode Token" });
    }

    const user = await UserModel.findById(decode.userId).select("-password");

    if (!user) {
      return res.status(401).json({ error: "User Not Found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in Protected Routes Middleware :: ", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = protectRoutes;