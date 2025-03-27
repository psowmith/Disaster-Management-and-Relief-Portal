// routes/authRoutes.js
const { isAdmin } = require('../middlewares/authMiddleware');
const express = require('express');
const { registerUser, loginUser,updateUser,deleteUser, getVolunteerDetails, updateUserNotifications, getUserDetails, getAllUsers } = require('../controllers/authController');

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);

// Get volunteer details
router.get('/volunteer/profile/:id', getVolunteerDetails);

// Update user notifications
router.post('/volunteer/notifications', updateUserNotifications);

// Get user details
router.get('/user/profile/:id', getUserDetails);

// Get all users
router.get('/users', getAllUsers);

// Update user details
router.post('/user/profile/:id', updateUser);

// Delete a user
router.delete('/user/profile/:id', deleteUser);
module.exports = router;
