// models/Disaster.js
const mongoose = require('mongoose');
//require('dotenv').config({ path: '../.env' });
//const authDatabase = mongoose.createConnection(process.env.MONGO_URL);
//const mongoose = require('mongoose');
const disasterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a disaster title'],
    },
    image: {
      type: String,
      default: 'no-photo.jpg',
    },
    location: {
      type: String,
      required: [true, 'Please add a location'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    status: {
      type: String,
      enum: ['reported', 'in-progress', 'resolved'],
      default: 'reported',
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
    },
    Username: {
      type: String,
      required: [true, 'Please add a username'],
    },
    notifications: {
      type: [String], // Array of strings
      default: [],    // Default to an empty array
    },
  },
  {
    timestamps: true,
  }
);

const Disaster = mongoose.model('Disaster', disasterSchema);
module.exports = Disaster;
