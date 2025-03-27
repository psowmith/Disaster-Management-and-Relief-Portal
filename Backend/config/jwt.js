// config/jwt.js
const jwt = require('jsonwebtoken');
require('dotenv').config({path:'../.env'});
// Function to generate a JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' } // Token valid for 1 day
  );
};

// Middleware to verify a JWT
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
