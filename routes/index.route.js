const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', auth, indexController.home);

router.get('/dashboard', auth, indexController.dashboard);

module.exports = router;
