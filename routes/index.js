const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

router.get('/services', (req, res) => {
    res.render('services', { title: 'Services' });
});

router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});

router.get('/blog', (req, res) => {
    res.render('blog', { title: 'Blog' });
});

module.exports = router;
