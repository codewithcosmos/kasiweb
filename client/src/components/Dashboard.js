import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const user = useSelector(state => state.auth.user);

  return (
    <div className="dashboard">
      <h1>Welcome, {user ? user.email : 'Guest'}</h1>
      <nav>
        <ul>
          <li><Link to="/products">Product List</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/quotes">Quotes</Link></li>
          <li><Link to="/invoices">Invoices</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
