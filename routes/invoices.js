const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');  // Correct path
const pdfGenerator = require('../utils/pdfGenerator');  // Correct path

router.post('/', async (req, res) => {
    const { cartId } = req.body;
    
    try {
        const cart = await Cart.findById(cartId).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        // Generate PDF for invoice
        const pdfPath = await pdfGenerator.generateInvoicePDF(cart);

        // Save the invoice logic here...

        res.status(200).json({ message: 'Invoice generated', pdfPath });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to generate invoice' });
    }
});

module.exports = router;
