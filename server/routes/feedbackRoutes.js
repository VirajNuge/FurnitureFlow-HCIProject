import express from 'express';
const router = express.Router();

// POST /api/feedback
router.post('/', (req, res) => {
  res.status(201).json({ message: 'Feedback received' });
});

// GET /api/feedback
router.get('/', (req, res) => {
  res.json([]);
});

export default router;
