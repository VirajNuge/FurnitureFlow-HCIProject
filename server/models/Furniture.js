const mongoose = require('mongoose');

const furnitureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['chair', 'table', 'sofa', 'bed', 'shelf', 'lamp'],
    required: true,
  },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  depth: { type: Number, required: true },
  defaultColor: { type: String, default: '#93c5fd' },
  modelURL: { type: String, default: '' },
  tags: { type: [String], default: [] },
}, { timestamps: true });

furnitureSchema.index({ type: 1, name: 1 });
furnitureSchema.index({ tags: 1 });

const Furniture = mongoose.model('Furniture', furnitureSchema);
module.exports = Furniture;
