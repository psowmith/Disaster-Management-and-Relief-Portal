// routes/resourceRoutes.js
const express = require('express');
const { addResource, getResources, updateResourceQuantity } = require('../controllers/resourceController');
const { protect,isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Add a new resource (Admin only)
router.post('/', protect, isAdmin, addResource);

// Get all resources (Admin only)
router.get('/', protect, isAdmin, getResources);

// Update resource quantity (Admin only)
router.put('/:id', protect, isAdmin, updateResourceQuantity);

module.exports = router;
