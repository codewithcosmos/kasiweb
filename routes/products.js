// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    console.log('Session user:', req.session.user);
    if (!req.session.user) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const products = await Product.find();
        res.render('products', {
            title: 'Products',
            products: products,
            user: req.session.user,
            body: `
                <h1>Product List</h1>
                ${products.length > 0 ? 
                `<ul>
                    ${products.map(product => `<li>${product.name} - Price: ${product.price}</li>`).join('')}
                </ul>` : 
                '<p>No products available</p>'}
            `
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
