const searchReducer = (state, action) => {
  
  switch (action.type) {
    case 'CURRENT_SEARCH':
     
        return {...state, searchResults: action.search,
          searchLength: action.length };
    case 'CLEAR_SEARCH':
      if (action.payload === "clearing") {
        return {...state, searchResults: [],
          searchLength: 0 };
      }
      return;
    default:
      return;
  }
}
export default searchReducer; 