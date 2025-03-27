// controllers/volunteerController.js
const Volunteer = require('../models/Volunteer');
const { generateToken } = require('../config/jwt');
// @desc Register a new volunteer
// @route POST /api/volunteers
// @access Public
const registerVolunteer = async (req, res) => {
  const { name, email, password,role } = req.body;

  try {
    const userExists = await Volunteer.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const volunteer = await Volunteer.create({ name, email, password, skills: null, assignedDisaster :null });
    if (volunteer) {
      res.status(201).json({
        id: volunteer._id,
        name: volunteer.name,
        email: volunteer.email,
        password: volunteer.password,
        skills: volunteer.skills,
        assignedDisaster: volunteer.assignedDisaster,
        token: generateToken(volunteer),
      });
    } else {
      res.status(400).json({ message: 'Invalid volunteer data' });
    }
    //res.status(201).json(volunteer);
  } catch (error) {
    res.status(500).json({ message: 'Server error 🥵' });
  }
};

const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing

const updateVolunteer = async (req, res) => {
  const id = req.params.id;
  let updatedData = req.body;

  try {
    // Encrypt the password if it is being updated
    if (updatedData.password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(updatedData.password, salt);
    }

    // Update the volunteer
    const updatedVolunteer = await Volunteer.findByIdAndUpdate(
      id,
      { ...updatedData, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedVolunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    res.status(200).json({
      message: 'Volunteer details updated successfully',
      volunteer: updatedVolunteer,
    });
  } catch (error) {
    console.error('Error updating volunteer:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// @desc Get all volunteers
// @route GET /api/volunteers
// @access Admin
const getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndDelete(req.params.id);
    if (volunteer) {
      console.log(req.params.id);
      res.json({ message: 'User removed' });
      // console.log("User removed");
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}
module.exports = { registerVolunteer, getVolunteers, updateVolunteer, deleteVolunteer };
