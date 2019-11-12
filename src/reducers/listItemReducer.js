import {} from 'react';

const listItemReducer = (state, action) => {
  // console.log(action);

  switch (action.type) {
    case "ADD_ITEM":
      return {
        // ...state, action.item
      };
    default:
      return;
  }
}
export default listItemReducer;