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

export const getDesign = async (req, res) => {
  try {
    const design = await Design.findOne({ _id: req.params.id, userId: req.user._id });
    if (!design) return res.status(404).json({ message: 'Design not found' });
    res.json(design);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
