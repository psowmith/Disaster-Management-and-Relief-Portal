// routes/disasterRoutes.js
const express = require('express');
const { reportDisaster, getDisasters, updateDisasterStatus, fetchDisaster, deleteDisaster,allDisasters } = require('../controllers/disasterController');
//const { protect,isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

// Report a new disaster (Public)
router.post('/', reportDisaster);

// Get all disasters (Public)
router.get('/', getDisasters);

// Get a disaster by ID (Public)
router.get('/:id', fetchDisaster);

// Update disaster status (Admin only)
router.post('/:id', updateDisasterStatus);

// Delete a disaster (Admin only)
router.delete('/:id', deleteDisaster);

// Get all disasters (Admin only)
router.get('/all', allDisasters);
module.exports = router;
