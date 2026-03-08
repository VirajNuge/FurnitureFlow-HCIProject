import express from 'express';
import { createDesign, getDesign, listDesigns, updateDesign, deleteDesign } from '../controllers/designController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const { userId } = req;

  // Delegate to listDesigns but with pagination
  try {
    const Design = (await import('../models/Design.js')).default;
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

export default router;
