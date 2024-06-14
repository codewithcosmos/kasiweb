import axios from 'axios';

export const createQuote = (quote) => async (dispatch) => {
  const response = await axios.post('/quotes', quote);
  dispatch({ type: 'CREATE_QUOTE', payload: response.data });
};
