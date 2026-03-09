const express = require('express');
const router = express.Router();
const { register, login, refreshToken, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateRegister, validateLogin } = require('../middleware/validateAuth');
const rateLimiter = require('../middleware/rateLimiter');

router.post('/register', rateLimiter, validateRegister, register);
router.post('/login', rateLimiter, validateLogin, login);
router.post('/refresh', refreshToken);
router.get('/me', protect, getMe);

module.exports = router;
