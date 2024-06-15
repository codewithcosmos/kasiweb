// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth');  // Import the middleware

router.get('/dashboard', isAuthenticated, (req, res) => {  // Use the middleware
  res.render('admin/dashboard');
});

module.exports = router;
