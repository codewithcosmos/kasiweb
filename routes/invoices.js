const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const pdfGenerator = require('../utils/pdfGenerator');

router.post('/create', async (req, res) => {
  const { userId, products, totalAmount } = req.body;
  const newInvoice = new Invoice({ userId, products, totalAmount });

  try {
    await newInvoice.save();

    // Generate PDF
    const pdfPath = await pdfGenerator.generateInvoicePDF(newInvoice);
    res.status(201).json({ invoice: newInvoice, pdfPath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create invoice' });
  }
});

module.exports = router;
