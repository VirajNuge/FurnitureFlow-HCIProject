const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, default: 'My Room' },
  width: { type: Number, required: true },
  depth: { type: Number, required: true },
  height: { type: Number, required: true },
  wallColor: { type: String, default: '#f5f0e8' },
  floorTexture: { type: String, enum: ['wood', 'fabric', 'leather', 'plastic', 'metal'], default: 'wood' },
}, { timestamps: true });

roomSchema.index({ userId: 1, updatedAt: -1 });

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
