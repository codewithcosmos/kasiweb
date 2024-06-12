const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');  // Correct path
const Product = require('../models/Product');  // Correct path
const pdfGenerator = require('../utils/pdfGenerator');  // Correct path

router.post('/add', async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        let cart = await Cart.findOne();
        if (!cart) {
            cart = new Cart();
        }

        const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        cart.totalQuantity += quantity;
        cart.totalPrice += product.price * quantity;
        await cart.save();

        res.status(200).json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add item to cart' });
    }
});

router.get('/', async (req, res) => {
    try {
        const cart = await Cart.findOne().populate('items.productId');
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve cart' });
    }
});

router.post('/checkout', async (req, res) => {
    try {
        const cart = await Cart.findOne().populate('items.productId');
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        // Generate PDF for invoice
        const pdfPath = await pdfGenerator.generateInvoicePDF(cart);

        // Clear the cart after checkout
        await Cart.findByIdAndDelete(cart._id);

        res.status(200).json({ pdfPath });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Checkout failed' });
    }
});

module.exports = router;
