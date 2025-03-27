// models/Volunteer.js
const mongoose = require('mongoose');
// require('dotenv').config({ path: '../.env' });
// const authDatabase = mongoose.createConnection(process.env.MONGO_URL);
//const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const volunteerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      // required: [true, 'Please add a contact number'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
    },
    role: {
      type: String,
      default: 'volunteer',
    },
    skills: {
      type: [String],
      default: [],
      // required: [true, 'Please add skills'],
    },
    assignedDisaster: {
      type: String,
      //ref: 'Disaster',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
volunteerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
volunteerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const Volunteer = mongoose.model('Volunteer', volunteerSchema);
module.exports = Volunteer;