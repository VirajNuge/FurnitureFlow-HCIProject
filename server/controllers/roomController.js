const Room = require('../models/Room');

const roomPayload = (body = {}) => ({
  name: body.name,
  width: body.width,
  depth: body.depth,
  height: body.height,
  wallColor: body.wallColor,
  floorTexture: body.floorTexture,
});

const validateRoom = (payload) => {
  const numeric = ['width', 'depth', 'height'];
  if (numeric.some((field) => !Number.isFinite(Number(payload[field])) || Number(payload[field]) <= 0)) {
    return 'Room dimensions must be positive numbers';
  }
  if (Number(payload.width) > 5000 || Number(payload.depth) > 5000 || Number(payload.height) > 1000) {
    return 'Room dimensions exceed the supported limits';
  }
  return null;
};

const listRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    res.json(rooms);
  } catch {
    res.status(500).json({ message: 'Unable to load rooms' });
  }
};

const createRoom = async (req, res) => {
  const payload = { ...roomPayload(req.body), width: req.body.width ?? 500, depth: req.body.depth ?? 400, height: req.body.height ?? 280 };
  const error = validateRoom(payload);
  if (error) return res.status(400).json({ message: error });
  try {
    const room = await Room.create({ ...payload, userId: req.user.id });
    res.status(201).json(room);
  } catch {
    res.status(400).json({ message: 'Unable to create room' });
  }
};

const getRoom = async (req, res) => {
  try {
    const room = await Room.findOne({ _id: req.params.id, userId: req.user.id });
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch {
    res.status(404).json({ message: 'Room not found' });
  }
};

const updateRoom = async (req, res) => {
  const payload = roomPayload(req.body);
  const error = validateRoom({ ...payload, width: payload.width ?? 500, depth: payload.depth ?? 400, height: payload.height ?? 280 });
  if (error) return res.status(400).json({ message: error });
  try {
    const room = await Room.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: payload },
      { new: true, runValidators: true }
    );
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch {
    res.status(400).json({ message: 'Unable to update room' });
  }
};

module.exports = { listRooms, createRoom, getRoom, updateRoom };
