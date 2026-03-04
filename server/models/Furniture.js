import mongoose from 'mongoose';

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

const Furniture = mongoose.model('Furniture', furnitureSchema);
export default Furniture;
