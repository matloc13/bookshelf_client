const listReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_LIST":
      return [
        ...state,
        {
          id: action.id,
          userId: action.userId,
          title: action.title
        }
      ];
    case "SET_LIST":
      return (state = action.lists);
    case "UPDATE_LIST":
      return;
    case "DELETE_LIST":
      return;
    default:
      return state;
  }
};
export default listReducer;
