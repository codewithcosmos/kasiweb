import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import QuoteForm from './components/QuoteForm';
import InvoiceForm from './components/InvoiceForm';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/products" component={ProductList} />
            <Route path="/cart" component={Cart} />
            <Route path="/quotes" component={QuoteForm} />
            <Route path="/invoices" component={InvoiceForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/signup" component={SignupForm} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
