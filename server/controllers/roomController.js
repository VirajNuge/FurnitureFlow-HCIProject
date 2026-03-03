import Room from '../models/Room.js';

export const createRoom = async (req, res) => {
  try {
    const { name, width, height, depth } = req.body;
    const room = await Room.create({
      name: name || 'My Room',
      userId: req.user._id,
      width: width || 500,
      height: height || 300,
      depth: depth || 400,
    });
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
