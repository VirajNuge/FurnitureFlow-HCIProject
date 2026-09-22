const Design = require('../models/Design');

const pickDesignPayload = (body = {}) => ({
  name: body.name,
  room: body.room,
  furniture: body.furniture,
  thumbnail: body.thumbnail,
  isPublic: body.isPublic,
});

const getDesigns = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 12, 1), 50);
    const skip = (page - 1) * limit;
    const total = await Design.countDocuments({ userId: req.user.id });
    const designs = await Design.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('name thumbnail createdAt updatedAt');
    res.json({ designs, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Unable to load designs' });
  }
};

const getDesign = async (req, res) => {
  try {
    const design = await Design.findOne({ _id: req.params.id, userId: req.user.id });
    if (!design) return res.status(404).json({ message: 'Design not found' });
    res.json(design);
  } catch (err) {
    res.status(500).json({ message: 'Unable to load design' });
  }
};

const createDesign = async (req, res) => {
  try {
    const design = await Design.create({ ...pickDesignPayload(req.body), userId: req.user.id });
    res.status(201).json(design);
  } catch (err) {
    res.status(400).json({ message: err.name === 'ValidationError' ? err.message : 'Invalid design payload' });
  }
};

const updateDesign = async (req, res) => {
  try {
    const design = await Design.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: pickDesignPayload(req.body) },
      { new: true, runValidators: true }
    );
    if (!design) return res.status(404).json({ message: 'Design not found' });
    res.json(design);
  } catch (err) {
    res.status(400).json({ message: err.name === 'ValidationError' ? err.message : 'Invalid design payload' });
  }
};

const deleteDesign = async (req, res) => {
  try {
    const design = await Design.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!design) return res.status(404).json({ message: 'Design not found' });
    res.json({ message: 'Design deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Unable to delete design' });
  }
};

module.exports = { getDesigns, getDesign, createDesign, updateDesign, deleteDesign };
