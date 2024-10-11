const jwt = require("jsonwebtoken");

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Access denied. No token provided." });
  }

  try {
    // Verify JWT and attach user information to the request object
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add decoded user information to the request object
    next(); // Continue processing the request
  } catch (error) {
    res.status(403).json({ msg: "Invalid token." });
  }
};

module.exports = authenticateJWT;