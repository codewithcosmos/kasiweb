const Invoice = require('../models/invoice');
const Quote = require('../models/quote');

exports.createInvoice = (req, res) => {
    const { quoteId } = req.session;

    if (!quoteId) {
        return res.status(400).send('No quote found');
    }

    const newInvoice = new Invoice({
        quoteId: quoteId
    });

    newInvoice.save()
        .then(invoice => {
            res.redirect('/invoice/confirmation');
        })
        .catch(err => res.status(500).send(err.message));
};
