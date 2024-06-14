const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  const invoices = await Invoice.find().populate('items.productId');
  res.render('invoice', { invoices });
});

router.post('/', async (req, res) => {
  const { userId, items, totalPrice } = req.body;
  const invoice = new Invoice({ userId, items, totalPrice });
  await invoice.save();
  res.redirect('/invoices');
});

router.post('/update-status/:id', async (req, res) => {
  const invoice = await Invoice.findById(req.params.id);
  invoice.status = req.body.status;
  await invoice.save();
  res.redirect('/invoices');
});

module.exports = router;
