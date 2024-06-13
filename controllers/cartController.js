const Product = require('../models/product');

exports.addToCart = async (req, res) => {
    const { productId } = req.params;
    const quantity = parseInt(req.body.quantity, 10) || 1;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        let cart = req.session.cart ? req.session.cart : { items: [], totalQuantity: 0, totalPrice: 0 };

        const existingProductIndex = cart.items.findIndex(item => item.productId == productId);
        if (existingProductIndex >= 0) {
            cart.items[existingProductIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        cart.totalQuantity += quantity;
        cart.totalPrice += product.price * quantity;

        req.session.cart = cart;

        res.redirect('/cart');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCart = (req, res) => {
    const cart = req.session.cart ? req.session.cart : { items: [], totalQuantity: 0, totalPrice: 0 };
    res.render('cart', { cart });
};

exports.checkout = (req, res) => {
    res.render('checkout');
};
