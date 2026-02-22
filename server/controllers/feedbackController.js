import Feedback from '../models/Feedback.js';

export const submitFeedback = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const feedback = new Feedback({ userId: req.user._id, rating, comment });
    const saved = await feedback.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getFeedback = async (req, res) => {
  try {
    const list = await Feedback.find({});
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
