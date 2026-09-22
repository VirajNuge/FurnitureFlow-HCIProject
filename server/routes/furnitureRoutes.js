const express = require('express');
const { getAllFurniture } = require('../controllers/furnitureController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();
router.get('/', protect, getAllFurniture);

module.exports = router;
