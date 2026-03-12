const Design = require('../models/Design');

const getDesigns = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const total = await Design.countDocuments({ userId: req.user.id });
    const designs = await Design.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('name thumbnail createdAt updatedAt');
    res.json({ designs, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getDesign = async (req, res) => {
  try {
    const design = await Design.findOne({ _id: req.params.id, userId: req.user.id });
    if (!design) return res.status(404).json({ message: 'Design not found' });
    res.json(design);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createDesign = async (req, res) => {
  try {
    const design = await Design.create({ ...req.body, userId: req.user.id });
    res.status(201).json(design);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateDesign = async (req, res) => {
  try {
    const design = await Design.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!design) return res.status(404).json({ message: 'Design not found' });
    res.json(design);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteDesign = async (req, res) => {
  try {
    const design = await Design.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!design) return res.status(404).json({ message: 'Design not found' });
    res.json({ message: 'Design deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getDesigns, getDesign, createDesign, updateDesign, deleteDesign };
