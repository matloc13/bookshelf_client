const searchReducer = (state, action) => {
  
  switch (action.type) {
    case 'CURRENT_SEARCH':
     
        return {...state, searchResults: action.search,
          searchLength: action.length};
    default:
      return;
  }
}
export default searchReducer; 