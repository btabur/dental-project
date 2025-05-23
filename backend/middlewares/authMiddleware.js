const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  // Cookie'den token alın
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token bulunamadı" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({ message: "Geçersiz token" });
  }
};

module.exports = authMiddleware;
