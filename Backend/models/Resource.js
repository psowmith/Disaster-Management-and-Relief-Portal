// models/Resource.js
const mongoose = require('mongoose');
// require('dotenv').config({ path: '../.env' });
// const authDatabase = mongoose.createConnection(process.env.MONGO_URL);
//const mongoose = require('mongoose');
const resourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a resource name'],
    },
    quantity: {
      type: Number,
      required: [true, 'Please add a quantity'],
      min: [0, 'Quantity cannot be negative'],
    },
    type: {
      type: String,
      enum: ['medical', 'food', 'shelter', 'other'],
      default: 'other',
    },
    allocatedToDisaster: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Disaster',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Resource = mongoose.model('Resource', resourceSchema);
module.exports = Resource;