const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET
const User = require("../models/User");

module.exports = async (req, res, next) => {
  if (req.headers.jwt) {
    const decoded = await jwt.verify(req.headers.jwt, SECRET);
    const currentUser = await User.findById(decoded.id).select("-password");
    if (!currentUser) return res.status(400).json({ error: "Invalid token" });
    req.user = currentUser;
    next();
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
};
