// routes/volunteerRoutes.js
const express = require('express');
const { registerVolunteer, getVolunteers,updateVolunteer, deleteVolunteer } = require('../controllers/volunteerController');
//const { protect,isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

// Register a new volunteer (Public)
router.post('/', registerVolunteer);

// Get all volunteers (Admin only)
router.get('/', getVolunteers);

// Update volunteer details (Private)
router.post('/:id', updateVolunteer);

// Delete a volunteer (Admin only)
router.delete('/:id', deleteVolunteer);
module.exports = router;
