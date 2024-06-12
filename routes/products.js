// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Route to display all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('products', { products });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to add a new product (optional, you might populate your database initially)
router.post('/add', async (req, res) => {
    const { name, description, price, category, image } = req.body;
    try {
        const newProduct = new Product({ name, description, price, category, image });
        await newProduct.save();
        res.redirect('/products');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
