import {} from "react";
import dispatchItem from "./../reducers/listItemReducer";
import uuid from "uuid";
const initItem = {};

const listReducer = (state, action) => {
  // const [listItem, dispatchItem] = useReducer(listItemReducer, initItem);
  switch (action.type) {
    case "CREATE_LIST":
      return [
        ...state,
        {
          id: uuid(),
          userId: action.userId,
          title: action.title,
          items: [
            dispatchItem({
              type: "ADD_ITEM",
              item: action.item
            })
          ]
        }
      ];
    default:
      return state;
  }
};
export default listReducer;
