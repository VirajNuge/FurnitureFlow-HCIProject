import Design from '../models/Design.js';

export const createDesign = async (req, res) => {
  try {
    const { name, roomId, furnitureItems } = req.body;
    const design = await Design.create({
      name: name || 'Untitled Design',
      userId: req.user._id,
      roomId,
      furnitureItems: furnitureItems || [],
    });
    res.status(201).json(design);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
