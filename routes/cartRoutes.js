// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

router.get('/', async (req, res) => {
    console.log('Session user:', req.session.user);
    if (!req.session.user) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const cart = await Cart.findOne({ userId: req.session.user._id });
        res.render('cart', {
            title: 'Cart',
            cart: cart || { items: [] },
            user: req.session.user,
            body: `
                <h1>Shopping Cart</h1>
                ${cart && cart.items.length > 0 ? 
                `<ul>
                    ${cart.items.map(item => `<li>${item.product.name} - Quantity: ${item.quantity}</li>`).join('')}
                </ul>` : 
                '<p>Your cart is empty</p>'}
            `
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
