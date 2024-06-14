const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// User sign up
router.get('/signup', (req, res) => {
    res.render('user/signup');
});

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password, isAdmin: false });
    await user.save();
    res.redirect('/user/login');
});

// User login
router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.redirect('/');
    } else {
        res.redirect('/user/login');
    }
});

module.exports = router;
