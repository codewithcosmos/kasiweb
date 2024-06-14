const initialState = {
    user: null,
    isAuthenticated: false,
    loading: true
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
          loading: false
        };
      case 'SIGNUP':
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
          loading: false
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  