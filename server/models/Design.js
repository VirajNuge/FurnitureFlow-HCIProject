import mongoose from 'mongoose';

const designSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, default: 'Untitled Design' },
  furnitureItems: { type: Array, default: [] },
}, { timestamps: true });

const Design = mongoose.model('Design', designSchema);
export default Design;
