const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

const generateRefreshToken = (id) =>
  jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

const hashToken = (token) => bcrypt.hash(token, 10);

const issueTokens = async (user) => {
  const token = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  user.refreshTokenHash = await hashToken(refreshToken);
  await user.save();
  return { token, refreshToken };
};

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();
    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) return res.status(400).json({ message: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name: name.trim(), email: normalizedEmail, password: hashed });
    const tokens = await issueTokens(user);
    res.status(201).json({ ...tokens, user: publicUser(user) });
  } catch (err) {
    res.status(500).json({ message: 'Unable to create account' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+refreshTokenHash');
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    const tokens = await issueTokens(user);
    res.json({ ...tokens, user: publicUser(user) });
  } catch (err) {
    res.status(500).json({ message: 'Unable to sign in' });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;
    if (!token) return res.status(400).json({ message: 'Refresh token required' });
    if (!process.env.JWT_REFRESH_SECRET) return res.status(500).json({ message: 'Authentication is not configured' });
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id).select('+refreshTokenHash');
    if (!user) return res.status(401).json({ message: 'User not found' });
    if (!user.refreshTokenHash || !(await bcrypt.compare(token, user.refreshTokenHash))) {
      return res.status(401).json({ message: 'Refresh token has been revoked' });
    }
    const tokens = await issueTokens(user);
    res.json({ ...tokens, user: publicUser(user) });
  } catch {
    res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;
    if (token && process.env.JWT_REFRESH_SECRET) {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      await User.findByIdAndUpdate(decoded.id, { $set: { refreshTokenHash: null } });
    }
  } catch {
    // Logout is intentionally idempotent even when the token is already expired.
  }
  res.status(204).send();
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login, refreshToken, logout, getMe };
