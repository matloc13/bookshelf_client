import {} from "react";
import uuid from "uuid";

const listReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_LIST":
      return [
        ...state,
        {
          id: uuid(),
          userId: action.userId,
          title: action.title
        }
      ];
    default:
      return state;
  }
};
export default listReducer;
