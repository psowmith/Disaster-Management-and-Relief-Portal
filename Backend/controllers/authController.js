// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Volunteer = require('../models/Volunteer');
const { generateToken } = require('../config/jwt');
require('dotenv').config({ path: '../.env' });
// @desc Register a new user
// @route POST /api/auth/register
// @access Public
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({ name, email, password, role });

    if (user) {
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Login a user
// @route POST /api/auth/login
// @access Public
// @desc Login a user
// @route POST /api/auth/login
// @access Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if it's an admin login first
    if (email === "Admin@ac.in" && password === "Admin123") {
      return res.json({
        id: "Admin",
        name: "Admin",
        email: "Admin@ac.in",
        role: "Admin",
        token: generateToken("Admin"),
      });
    }

    // Find user or volunteer by email
    const user = await User.findOne({ email }).select('+password'); // Ensure the password is also returned
    const volunteer = await Volunteer.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      // If user is found and password matches
      return res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user),
      });
    }

    if (volunteer && (await volunteer.matchPassword(password))) {
      // If volunteer is found and password matches
      return res.json({
        id: volunteer._id,
        name: volunteer.name,
        email: volunteer.email,
        role: "Volunteer",
        token: generateToken(volunteer),
      });
    }

    // If no valid login credentials found
    return res.status(401).json({ message: 'Invalid email or password' });

  } catch (error) {
    res.status(500).json({ message: 'Server error 🥵😒', error: error.message });
  }
};

const getVolunteerDetails = async (req,res) => {
  try {
    const user = await Volunteer.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

const getUserDetails = async (req,res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

const updateUserNotifications = async (req, res) => {
  console.log("Welcome to updateUserNotifications");
  try {
    const { email, data } = req.body; // Extract email and data from the request body
    console.log("Email:", email, "Data:", data);

    // Fetch the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if messages is a string, if so, convert it to an array
    if (typeof user.messages === 'string') {
      user.messages = [user.messages]; // Convert the string to an array
    }

    // Push the new message into the messages array
    user.messages.push(data);

    // Save the updated user
    await user.save();

    console.log("User messages after update:", user.messages);

    res.json(user);
  } catch (error) {
    console.error("Error in updateUserNotifications:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      console.log(req.body);
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
      //user.password = req.body.password || user.password;
      const updatedUser = await user.save();
      res.json({
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
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
module.exports = { registerUser, loginUser,updateUser,deleteUser, getVolunteerDetails,updateUserNotifications,getUserDetails, getAllUsers };
