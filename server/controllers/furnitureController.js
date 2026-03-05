import Furniture from '../models/Furniture.js';

export const getAllFurniture = async (req, res) => {
  try {
    const items = await Furniture.find({}).sort({ type: 1, name: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
