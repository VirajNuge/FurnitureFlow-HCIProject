const mongoose = require('mongoose');

const furnitureItemSchema = new mongoose.Schema({
  furnitureId: { type: mongoose.Schema.Types.ObjectId, ref: 'Furniture' },
  type: String,
  label: String,
  x: Number,
  y: Number,
  width: Number,
  height: Number,
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
    name: { type: String, required: true, trim: true },
    room: {
      width: { type: Number, default: 500 },
      depth: { type: Number, default: 400 },
      height: { type: Number, default: 280 },
      wallColor: { type: String, default: '#f5f0e8' },
      floorTexture: { type: String, default: 'wood' },
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
