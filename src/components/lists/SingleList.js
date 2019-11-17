import React, { useContext, useState } from "react";
import DispatchContext from "./../../contexts/dispatchContext";
import ListContext from "./../../contexts/listContext";
import useManageItem from "./../../hooks/useManageItem";
import Modal from "./../modal/Modal";

const SingleList = () => {
  const dispatch = useContext(DispatchContext);
  const allLists = useContext(ListContext);
  const [deleteItem] = useManageItem();
  const [show, setShow] = useState(false);
  console.log(allLists.sList);

  const handleClick = (ele, type) => {
    console.log(ele);

    switch (type) {
      case "cur":
        dispatch({ type: "SET_CURRENT_GAME", game: ele.bggid });
        return setShow(!show);
      case "del":
        dispatch({
          type: "DELETE_ITEM",
          list: ele.listanme_id,
          id: ele.id
        });
        return deleteItem();
      default:
        return;
    }
  };

  return (
    <>
      {show && <Modal />}
      <h1>hello</h1>
      <ul>
        {allLists.sList &&
          allLists.sList.map(ele => {
            return (
              <li onClick={() => handleClick(ele, "cur")}>
                {ele.name}
                <span onClick={() => handleClick(ele, "del")}>X</span>
              </li>
            );
          })}
      </ul>
    </>
  );
};
export default SingleList;
