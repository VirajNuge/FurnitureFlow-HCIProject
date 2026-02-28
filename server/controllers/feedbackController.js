import Feedback from '../models/Feedback.js';

export const submitFeedback = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    const feedback = new Feedback({ userId: req.user._id, rating, comment });
    const saved = await feedback.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getFeedback = async (req, res) => {
  try {
    const list = await Feedback.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAdminFeedback = async (req, res) => {
  try {
    const list = await Feedback.find({}).populate('userId', 'name email').sort({ createdAt: -1 });
    const avg = list.length
      ? (list.reduce((s, f) => s + f.rating, 0) / list.length).toFixed(2)
      : null;
    res.json({ total: list.length, averageRating: avg, feedback: list });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
