const express = require('express');
const { createDesign, getDesign, listDesigns, updateDesign, deleteDesign } = require('../controllers/designController');
const { protect } = require('../middleware/authMiddleware');
const Design = require('../models/Design');

const router = express.Router();

router.get('/', protect, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  try {
    const total = await Design.countDocuments({ userId: req.user._id });
    const designs = await Design.find({ userId: req.user._id })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);
    res.json({ designs, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', protect, createDesign);
router.get('/:id', protect, getDesign);
router.put('/:id', protect, updateDesign);
router.delete('/:id', protect, deleteDesign);

module.exports = router;
