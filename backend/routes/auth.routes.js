const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authLimiter = require('../middlewares/rateLimit');

router.post('/register', authLimiter, authController.registrar);
router.post('/registro', authLimiter, authController.registrar);
router.post('/login', authLimiter, authController.login);

module.exports = router;