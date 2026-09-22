const express = require('express');
const { createDesign, getDesign, getDesigns, updateDesign, deleteDesign } = require('../controllers/designController');
const { protect } = require('../middleware/authMiddleware');
const Design = require('../models/Design');

const router = express.Router();

router.get('/', protect, getDesigns);

router.post('/', protect, createDesign);
router.get('/:id', protect, getDesign);
router.put('/:id', protect, updateDesign);
router.delete('/:id', protect, deleteDesign);

module.exports = router;
