const Quote = require('../models/quote');

exports.createQuote = (req, res) => {
    const { cart } = req.session;

    if (!cart) {
        return res.status(400).send('Cart is empty');
    }

    const newQuote = new Quote({
        items: cart.items,
        totalQuantity: cart.totalQuantity,
        totalPrice: cart.totalPrice
    });

    newQuote.save()
        .then(quote => {
            req.session.quoteId = quote._id;
            res.redirect('/quote/confirmation');
        })
        .catch(err => res.status(500).send(err.message));
};

exports.confirmationPage = (req, res) => {
    res.render('quoteConfirmation');
};
