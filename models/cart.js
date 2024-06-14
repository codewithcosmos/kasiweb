const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: Number
    }],
    totalPrice: Number
});

module.exports = mongoose.model('Cart', cartSchema);
