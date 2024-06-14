import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';
import quoteReducer from './reducers/quoteReducer';
import invoiceReducer from './reducers/invoiceReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
  quote: quoteReducer,
  invoice: invoiceReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
