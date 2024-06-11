const User = require('../models/User');
const Quote = require('../models/Quote');
const Invoice = require('../models/Invoice');
const BlogPost = require('../models/BlogPost');

// Dashboard
exports.getDashboard = (req, res) => {
    res.render('admin/dashboard', { title: 'Admin Dashboard' });
};

// Manage Quotes
exports.manageQuotes = async (req, res) => {
    try {
        const quotes = await Quote.find();
        res.render('admin/manageQuotes', { title: 'Manage Quotes', quotes });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Manage Invoices
exports.manageInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.render('admin/manageInvoices', { title: 'Manage Invoices', invoices });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// View Single Invoice
exports.viewInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).send('Invoice not found');
        }
        res.render('admin/viewInvoice', { title: 'View Invoice', invoice });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Create Invoice
exports.createInvoice = async (req, res) => {
    try {
        const { client, items, total } = req.body;
        const newInvoice = new Invoice({ client, items, total });
        await newInvoice.save();
        res.redirect('/admin/invoices');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Edit Invoice
exports.editInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).send('Invoice not found');
        }
        res.render('admin/editInvoice', { title: 'Edit Invoice', invoice });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Update Invoice
exports.updateInvoice = async (req, res) => {
    try {
        const { client, items, total } = req.body;
        let invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).send('Invoice not found');
        }
        invoice.client = client;
        invoice.items = items;
        invoice.total = total;
        await invoice.save();
        res.redirect('/admin/invoices');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Delete Invoice
exports.deleteInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).send('Invoice not found');
        }
        await invoice.remove();
        res.redirect('/admin/invoices');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
