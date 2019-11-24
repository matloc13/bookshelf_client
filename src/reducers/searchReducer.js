const searchReducer = (state, action) => {
  console.log(action.search);
  
  switch (action.type) {
    case 'CURRENT_SEARCH':
     
        return {...state, searchResults: action.search,
          searchLength: action.length};
    default:
      return;
  }
}
export default searchReducer; 