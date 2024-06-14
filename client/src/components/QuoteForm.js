import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createQuote } from '../redux/actions/quoteActions';

const QuoteForm = () => {
  const [items, setItems] = useState([{ productId: '', quantity: 1 }]);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { productId: '', quantity: 1 }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createQuote({ items, totalPrice }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Quote</h1>
      {items.map((item, index) => (
        <div key={index}>
          <input
            type="text"
            value={item.productId}
            onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
            placeholder="Product ID"
            required
          />
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
            placeholder="Quantity"
            required
          />
        </div>
      ))}
      <button type="button" onClick={handleAddItem}>Add Item</button>
      <input
        type="number"
        value={totalPrice}
        onChange={(e) => setTotalPrice(e.target.value)}
        placeholder="Total Price"
        required
      />
      <button type="submit">Create Quote</button>
    </form>
  );
};

export default QuoteForm;
