import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    res.status(201).json({ _id: user._id, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
