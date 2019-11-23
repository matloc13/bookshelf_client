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
      return [action.lists, ...state];
    case "UPDATE_LIST":
      return;
    case "DELETE_LIST":
      const newList = action.lists.filter(
        ele => ele.listname_id === action.listid
      );
      return [...state, newList];
    default:
      return state;
  }
};
export default listReducer;
