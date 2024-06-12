// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Cart = require('../models/Cart');

// Middleware to find or create cart
async function findOrCreateCart(req, res, next) {
    if (!req.session.cartId) {
        const cart = new Cart();
        await cart.save();
        req.session.cartId = cart._id;
    }
    req.cart = await Cart.findById(req.session.cartId).populate('items.productId');
    next();
}

router.use(findOrCreateCart);

// Add to cart route
router.post('/add-to-cart/:productId', async (req, res) => {
    const productId = req.params.productId;
    const cart = req.cart;
    const product = await Product.findById(productId);

    const cartItem = cart.items.find(item => item.productId.equals(product._id));
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.items.push({ productId: product._id, quantity: 1 });
    }

    cart.totalQuantity += 1;
    cart.totalPrice += product.price;
    await cart.save();

    res.redirect('/cart');
});

// View cart route
router.get('/cart', (req, res) => {
    res.render('cart', { cart: req.cart });
});

module.exports = router;
