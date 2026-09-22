const express = require('express');
const { createFeedback, getFeedback } = require('../controllers/feedbackController');
const { protect, requireAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createFeedback);
router.get('/', protect, requireAdmin, getFeedback);

module.exports = router;
