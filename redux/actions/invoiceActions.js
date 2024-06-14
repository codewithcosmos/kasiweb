import axios from 'axios';

export const createInvoice = (invoice) => async (dispatch) => {
  const response = await axios.post('/invoices', invoice);
  dispatch({ type: 'CREATE_INVOICE', payload: response.data });
};
