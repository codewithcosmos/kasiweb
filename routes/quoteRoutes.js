const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  const quotes = await Quote.find().populate('items.productId');
  res.render('quote', { quotes });
});

router.post('/', async (req, res) => {
  const { userId, items, totalPrice } = req.body;
  const quote = new Quote({ userId, items, totalPrice });
  await quote.save();
  res.redirect('/quotes');
});

module.exports = router;
