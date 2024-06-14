const initialState = {
    invoices: []
  };
  
  const invoiceReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CREATE_INVOICE':
        return {
          ...state,
          invoices: [...state.invoices, action.payload]
        };
      default:
        return state;
    }
  };
  
  export default invoiceReducer;
  