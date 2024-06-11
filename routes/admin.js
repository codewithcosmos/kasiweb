const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');
const User = require('../models/User');
const adminController = require('../controllers/adminController');

const express = require('express');
const adminController = require('../controllers/adminController');

// Dashboard
router.get('/dashboard', adminController.getDashboard);

// Manage Quotes
router.get('/quotes', adminController.manageQuotes);

// Manage Invoices
router.get('/invoices', adminController.manageInvoices);
router.get('/invoices/:id', adminController.viewInvoice);
router.post('/invoices', adminController.createInvoice);
router.get('/invoices/edit/:id', adminController.editInvoice);
router.post('/invoices/update/:id', adminController.updateInvoice);
router.post('/invoices/delete/:id', adminController.deleteInvoice);

module.exports = router;



// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  } else {
    res.redirect('/admin/login');
  }
}

router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('admin/dashboard');
});

router.get('/manageQuotes', isAuthenticated, async (req, res) => {
  const quotes = await Quote.find();
  res.render('admin/manageQuotes', { quotes });
});

router.get('/manageUsers', isAuthenticated, async (req, res) => {
  const users = await User.find();
  res.render('admin/manageUsers', { users });
});

router.get('/login', (req, res) => {
  res.render('admin/login');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

module.exports = router;
