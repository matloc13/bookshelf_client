const searchReducer = (state, action) => {
  console.log(action.search);
  
  switch (action.type) {
    case 'CURRENT_SEARCH':
        return {...state, searchResults: action.search};
    default:
      return;
  }
}
export default searchReducer; 