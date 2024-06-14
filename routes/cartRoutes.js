const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Cart = require('../models/Cart');

router.post('/add-to-cart/:productId', async (req, res) => {
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity, 10);

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        let cart = req.session.cart || { items: [], totalPrice: 0 };

        const cartItemIndex = cart.items.findIndex(item => item.product._id.toString() === productId);
        if (cartItemIndex > -1) {
            cart.items[cartItemIndex].quantity += quantity;
        } else {
            cart.items.push({ product, quantity });
        }
        cart.totalPrice += product.price * quantity;

        req.session.cart = cart;
        res.redirect('/cart');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding to cart');
    }
});

router.get('/', (req, res) => {
    const cart = req.session.cart || { items: [], totalPrice: 0 };
    res.render('cart', { cart });
});

module.exports = router;
