import {} from "react";
import dispatchItem from "./../reducers/listItemReducer";



const listReducer = (state, action) => {
  // const [listItem, dispatchItem] = useReducer(listItemReducer, initItem);
  switch (action.type) {
    case "CREATE_LIST":
      return [
        ...state,
        {
          id: action.id,
          userId: action.userId,
          title: action.title,
          // items: [
          //   dispatchItem({
          //     id: uuid(),
          //     type: "ADD_ITEM",
          //     item: action.item
          //   })
          // ]
        }
      ];
    case "SET_LIST":
      return state = action.lists
    default:
      return state;
  }
};
export default listReducer;