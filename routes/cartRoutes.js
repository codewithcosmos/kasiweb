const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add-to-cart/:productId', cartController.addToCart);
router.get('/', cartController.getCart);
router.get('/checkout', cartController.checkout);

module.exports = router;
