const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: { type: Number, required: true }
    }],
    totalQuantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
});

module.exports = mongoose.model('Cart', cartSchema);
