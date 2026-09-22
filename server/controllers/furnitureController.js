const Furniture = require('../models/Furniture');

const getAllFurniture = async (req, res) => {
  try {
    const filter = {};
    if (req.query.type) filter.type = req.query.type;
    if (req.query.q) filter.$or = [
      { name: { $regex: req.query.q.trim(), $options: 'i' } },
      { tags: { $regex: req.query.q.trim(), $options: 'i' } },
    ];
    const items = await Furniture.find(filter).sort({ type: 1, name: 1 }).limit(100);
    res.json(items);
  } catch {
    res.status(500).json({ message: 'Unable to load furniture catalog' });
  }
};

module.exports = { getAllFurniture };
