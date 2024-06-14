const initialState = {
    quotes: []
  };
  
  const quoteReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CREATE_QUOTE':
        return {
          ...state,
          quotes: [...state.quotes, action.payload]
        };
      default:
        return state;
    }
  };
  
  export default quoteReducer;
  