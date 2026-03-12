const Feedback = require('../models/Feedback');

const createFeedback = async (req, res) => {
  try {
    const { designId, rating, comment } = req.body;
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    const feedback = await Feedback.create({
      userId: req.user.id,
      designId,
      rating,
      comment: comment?.trim(),
    });
    res.status(201).json(feedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getFeedback = async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { userId: req.user.id };
    const feedback = await Feedback.find(filter)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
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
