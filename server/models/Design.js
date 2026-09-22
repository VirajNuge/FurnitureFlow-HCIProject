const mongoose = require('mongoose');

const furnitureItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  furnitureId: { type: mongoose.Schema.Types.ObjectId, ref: 'Furniture' },
  type: String,
  label: String,
  x: { type: Number, min: 0 },
  y: { type: Number, min: 0 },
  width: { type: Number, min: 1 },
  height: { type: Number, min: 1 },
  depth: { type: Number, min: 1 },
  rotation: { type: Number, default: 0 },
  color: String,
  textureId: String,
}, { _id: false });

const designSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    room: {
      width: { type: Number, min: 1, max: 5000, default: 500 },
      depth: { type: Number, min: 1, max: 5000, default: 400 },
      height: { type: Number, min: 1, max: 1000, default: 280 },
      wallColor: { type: String, match: /^#[0-9a-fA-F]{6}$/, default: '#f5f0e8' },
      floorTexture: { type: String, enum: ['wood', 'fabric', 'leather', 'plastic', 'metal'], default: 'wood' },
    },
    furniture: { type: [furnitureItemSchema], default: [] },
    thumbnail: { type: String, default: '' },
    isPublic: { type: Boolean, default: false },
  },
  { timestamps: true }
);

designSchema.index({ userId: 1, createdAt: -1 });
designSchema.index({ isPublic: 1, createdAt: -1 });

module.exports = mongoose.model('Design', designSchema);
