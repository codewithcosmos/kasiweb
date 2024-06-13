const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.render('layout', { title: 'Products', body: `
            <h1>Products</h1>
            <div class="container">
                <div id="products-container">
                    ${products.map(product => `
                        <div class="product">
                            <img src="${product.imageUrl}" alt="${product.name}">
                            <h2>${product.name}</h2>
                            <p>${product.description}</p>
                            <p>Price: R${product.price}</p>
                            <form action="/cart/add-to-cart/${product._id}" method="POST">
                                <input type="number" name="quantity" value="1" min="1">
                                <button type="submit">Add to Cart</button>
                            </form>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
