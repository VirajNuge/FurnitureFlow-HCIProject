const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    const token = auth.split(' ')[1];
    if (!process.env.JWT_SECRET) return res.status(500).json({ message: 'Authentication is not configured' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password -refreshTokenHash');
    if (!req.user) return res.status(401).json({ message: 'User account not found' });
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalid' });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Administrator access required' });
  next();
};

module.exports = { protect, requireAdmin };
