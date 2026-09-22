const Feedback = require('../models/Feedback');

const createFeedback = async (req, res) => {
  try {
    const { designId, rating, comment } = req.body;
    if (!Number.isInteger(Number(rating)) || Number(rating) < 1 || Number(rating) > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    if (!comment || comment.trim().length < 5 || comment.trim().length > 500) {
      return res.status(400).json({ message: 'Comment must be between 5 and 500 characters' });
    }
    const feedback = await Feedback.create({
      userId: req.user.id,
      designId,
      rating: Number(rating),
      comment: comment.trim(),
    });
    res.status(201).json(feedback);
  } catch (err) {
    res.status(400).json({ message: err.name === 'ValidationError' ? err.message : 'Unable to submit feedback' });
  }
};

const getFeedback = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);
    const filter = {};
    if (req.query.from || req.query.to) {
      filter.createdAt = {};
      if (req.query.from) filter.createdAt.$gte = new Date(req.query.from);
      if (req.query.to) filter.createdAt.$lte = new Date(`${req.query.to}T23:59:59.999Z`);
    }
    if (req.user.role !== 'admin') filter.userId = req.user.id;
    const feedback = await Feedback.find(filter)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Feedback.countDocuments(filter);
    res.json({ feedback, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Unable to load feedback' });
  }
};

const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
    res.json({ message: 'Feedback deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createFeedback, getFeedback, deleteFeedback };
