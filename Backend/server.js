// server.js
require('dotenv').config({path:'./.env'}); // Load environment variables from .env file
const express = require('express');
const mongoose = require('./config/db');
const cors = require('cors');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const authRoutes = require('./routes/authRoutes');
const disasterRoutes = require('./routes/disasterRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const resourceRoutes = require('./routes/resourceRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing



// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/disasters', disasterRoutes); // Disaster management routes
app.use('/api/volunteers', volunteerRoutes); // Volunteer management routes
app.use('/api/resources', resourceRoutes); // Resource tracking routes

// Error handling middlewares
app.use(notFound); // Handle 404 errors
app.use(errorHandler); // Handle other errors

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
