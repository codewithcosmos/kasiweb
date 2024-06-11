const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    client: {
        type: String,
        required: true,
    },
    items: [{
        description: String,
        quantity: Number,
        price: Number,
    }],
    total: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
