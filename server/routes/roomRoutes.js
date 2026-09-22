const express = require('express');
const { listRooms, createRoom, getRoom, updateRoom } = require('../controllers/roomController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.get('/', listRooms);
router.post('/', createRoom);
router.get('/:id', getRoom);
router.put('/:id', updateRoom);

module.exports = router;
