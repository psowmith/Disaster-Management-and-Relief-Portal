// controllers/resourceController.js
const Resource = require('../models/Resource');

// @desc Add a new resource
// @route POST /api/resources
// @access Admin
const addResource = async (req, res) => {
  const { name, type, quantity, location } = req.body;

  try {
    const resource = await Resource.create({ name, type, quantity, location });

    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get all resources
// @route GET /api/resources
// @access Admin
const getResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Update resource quantity
// @route PUT /api/resources/:id
// @access Admin
const updateResourceQuantity = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    resource.quantity = req.body.quantity || resource.quantity;

    const updatedResource = await resource.save();
    res.json(updatedResource);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addResource, getResources, updateResourceQuantity };
