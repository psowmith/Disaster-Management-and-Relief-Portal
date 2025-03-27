// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../config/jwt');

// Middleware to verify JWT token
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, jwtSecret);

      // Get user from token and attach to request
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers['Authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'No authorization token found' });
  }

  // Extract the token from "Bearer <token>"
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret here

    // Check if the user role is 'admin'
    if (decoded.role === 'admin') {
      req.user = decoded; // Optionally attach the decoded user info to the request object
      next(); // Proceed to the next middleware or route handler
    } else {
      res.status(403).json({ message: 'Not authorized as admin' });
    }
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = isAdmin;


module.exports = { protect, isAdmin };
