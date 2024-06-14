const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Fetch products and render the products page
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.render('products', { products });
    } catch (err) {
        res.status(500).send("Error fetching products");
    }
});

module.exports = router;
