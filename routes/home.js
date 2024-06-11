const express = require('express');
const router = express.Router();

// Define your routes
router.get('/', (req, res) => {
    res.render('home'); // Make sure this matches your view file name
});

// Export the router
module.exports = router;
