// controllers/disasterController.js
const Disaster = require('../models/Disaster');

// @desc Report a new disaster
// @route POST /api/disasters
// @access Public
exports.reportDisaster = async (req, res) => {
  const { title,image,location,description,email,Username } = req.body;
  try {
    const disaster = await Disaster.create({ title,image,location,description,email,Username });
    res.status(201).json(disaster);
  } catch (error) {
    res.status(500).json({ message: 'Server error 🥵😒' });
  }
};

// @desc Get all disasters
// @route GET /api/disasters
// @access Public
exports.getDisasters = async (req, res) => {
  try {
    const disasters = await Disaster.find();
    res.json(disasters);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Update a disaster's status
// @route PUT /api/disasters/:id
// @access Admin
exports.updateDisasterStatus = async (req, res) => {
  try {
    const disaster = await Disaster.findById(req.params.id);
    const {status}=req.body;
    if (!disaster) {
      return res.status(404).json({ message: 'Disaster not found' });
    }

    disaster.status = status || disaster.status;

    const updatedDisaster = await disaster.save();
    res.json(updatedDisaster);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
exports.fetchDisaster = async (req,res) => {
  try {
    const disaster = await Disaster.findById(req.params.id);
    res.json(disaster);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}
exports.deleteDisaster = async (req,res) => {
  try {
    const disaster = await Disaster.findById(req.params.id);
    if (!disaster) {
      return res.status(404).json({ message: 'Disaster not found' });
    }
    await disaster.remove();
    res.json({ message: 'Disaster removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}
exports.allDisasters = async (req,res) => {
  try {
    const disasters = await Disaster.find();
    res.json(disasters);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}
// 
// module.exports = { reportDisaster, getDisasters, updateDisasterStatus };
