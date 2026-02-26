import express from 'express';
import { submitFeedback, getFeedback } from '../controllers/feedbackController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, submitFeedback);
router.get('/', protect, getFeedback);

export default router;
