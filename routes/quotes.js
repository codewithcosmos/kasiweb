const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');  // Correct path
const pdfGenerator = require('../utils/pdfGenerator');  // Correct path

router.post('/', async (req, res) => {
    const { name, email, service, message } = req.body;
    const newQuote = new Quote({ name, email, service, message });

    try {
        await newQuote.save();

        // Generate PDF for quote
        const pdfPath = await pdfGenerator.generateQuotePDF(newQuote);

        // Send email logic here...

        res.status(200).json({ message: 'Quote saved and PDF generated', pdfPath });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save quote' });
    }
});

module.exports = router;
