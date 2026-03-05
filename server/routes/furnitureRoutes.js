import express from 'express';
import { getAllFurniture } from '../controllers/furnitureController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getAllFurniture);

export default router;
