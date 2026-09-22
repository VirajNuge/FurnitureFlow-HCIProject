const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  designId: { type: mongoose.Schema.Types.ObjectId, ref: 'Design' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
}, { timestamps: true });

feedbackSchema.index({ createdAt: -1 });
feedbackSchema.index({ userId: 1, createdAt: -1 });

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
