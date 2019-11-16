import React, { useContext } from "react";
import DispatchContext from "./../../contexts/dispatchContext";
import ListContext from "./../../contexts/listContext";
const SingleList = () => {
  const dispatch = useContext(DispatchContext);
  const allLists = useContext(ListContext);
  // console.log(allLists.sList);

  return (
    <>
      <ul>
        {allLists.sList &&
          allLists.sList.map(ele => {
            return (
              <li
                onClick={() =>
                  dispatch({ type: "SET_CURRENT_GAME", game: ele.bggid })
                }
              >
                {ele.name}
              </li>
            );
          })}
      </ul>
    </>
  );
};
export default SingleList;
