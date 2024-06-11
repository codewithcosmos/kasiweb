const express = require('express');
const router = express.Router();

router.post('/submit-contact', (req, res) => {
    const { firstName, lastName, email, message } = req.body;

    // Process form data (e.g., save to database, send email, etc.)

    res.json({ success: true, message: 'Form submitted successfully!' });
});

module.exports = router;
