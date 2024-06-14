const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Admin login
router.get('/login', (req, res) => {
    res.render('admin/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && user.isAdmin && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.redirect('/admin/dashboard');
    } else {
        res.redirect('/admin/login');
    }
});

// Admin dashboard
router.get('/dashboard', (req, res) => {
    if (!req.session.user || !req.session.user.isAdmin) {
        return res.redirect('/admin/login');
    }
    res.render('admin/dashboard');
});

// Add product
router.get('/products', async (req, res) => {
    if (!req.session.user || !req.session.user.isAdmin) {
        return res.redirect('/admin/login');
    }
    const products = await Product.find();
    res.render('admin/products', { products });
});

router.post('/products', async (req, res) => {
    if (!req.session.user || !req.session.user.isAdmin) {
        return res.redirect('/admin/login');
    }
    const { name, description, price, imageUrl, category } = req.body;
    const product = new Product({ name, description, price, imageUrl, category });
    await product.save();
    res.redirect('/admin/products');
});

// More routes for admin to manage orders, etc.

module.exports = router;
