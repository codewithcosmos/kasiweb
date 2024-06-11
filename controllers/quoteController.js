const Quote = require('../models/Quote');

exports.getQuotePage = (req, res) => {
    res.render('quotes', { title: 'Get a Quote' });
};

exports.postQuote = async (req, res) => {
    const { name, email, service, message } = req.body;
    const newQuote = new Quote({ name, email, service, message });
    await newQuote.save();
    res.redirect('/quotes');
};
