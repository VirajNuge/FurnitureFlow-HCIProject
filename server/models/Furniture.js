import mongoose from 'mongoose';

const furnitureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  depth: { type: Number, required: true },
  defaultColor: { type: String, default: '#cccccc' },
}, { timestamps: true });

const Furniture = mongoose.model('Furniture', furnitureSchema);
export default Furniture;
