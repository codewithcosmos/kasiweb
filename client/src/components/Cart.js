import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/actions/cartActions';

const Cart = () => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      <ul>
        {cart.map(item => (
          <li key={item.product._id}>
            <h2>{item.product.name}</h2>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => handleRemoveFromCart(item.product._id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2>Total Price: {totalPrice}</h2>
      <button>Proceed to Checkout</button>
    </div>
  );
};

export default Cart;
