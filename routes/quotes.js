const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');
const nodemailer = require('nodemailer');
const pdfGenerator = require('../utils/pdfGenerator');

router.post('/create', async (req, res) => {
  const { name, email, service, message } = req.body;
  const newQuote = new Quote({ name, email, service, message });

  try {
    await newQuote.save();

    // Generate PDF
    const pdfPath = await pdfGenerator.generateQuotePDF(newQuote);

    // Setup Nodemailer
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    let mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Quote Request Received',
      text: `Thank you for your request, ${name}. We will get back to you soon.`,
      attachments: [
        {
          filename: 'quote.pdf',
          path: pdfPath
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json({ quote: newQuote, pdfPath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create quote' });
  }
});

module.exports = router;
