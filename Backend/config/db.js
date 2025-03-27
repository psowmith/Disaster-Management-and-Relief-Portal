const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

module.exports = mongoose;
