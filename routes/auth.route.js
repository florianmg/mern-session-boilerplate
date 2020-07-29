const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');

const authController = require('../controllers/auth.controller');

router.post('/login', authController.login);

router.post('/register', authController.register);

router.get('/check', auth, authController.checkAuth);

router.post('/logout', authController.logout);

module.exports = router;
