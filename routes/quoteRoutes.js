const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

router.post('/create', quoteController.createQuote);
router.get('/confirmation', quoteController.confirmationPage);

module.exports = router;
