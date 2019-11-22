import React, { useContext, useState } from "react";
import DispatchContext from "./../../contexts/dispatchContext";
import ListContext from "./../../contexts/listContext";
import useManageItem from "./../../hooks/useManageItem";
import Modal from "./../modal/Modal";

const SingleList = () => {
  const dispatch = useContext(DispatchContext);
  const allLists = useContext(ListContext);
  const [del, setDel] = useState(false);
  const [] = useManageItem(del);
  const [show, setShow] = useState(false);
  console.log(allLists.sList);

  const handleClick = (ele, type) => {
    console.log(ele);

    switch (type) {
      case "cur":
        dispatch({ type: "SET_CURRENT_GAME", game: ele.bggid });
        return setShow(!show);
      case "del":
        const promise = new Promise(resolve => {
          dispatch({
            type: "DELETE_ITEM",
            list: ele.listname_id,
            id: ele.id,
            game: ele.bggid
          });
          return resolve(setDel(true));
        });
        break;
      default:
        return;
    }
  };

  return (
    <>
      {show && <Modal setShow={setShow} show={show}/>}
      <ul>
        {allLists.sList &&
          allLists.sList.map(ele => {
            return (
              <li>
                <div  className="game-containter" onClick={() => handleClick(ele, "cur")}>
                  <h3>{ele.name}</h3>
                  <img src={ele.img} alt={ele.name}/>
                </div>
                <span onClick={() => handleClick(ele, "del")}>X</span>
              </li>
            );
          })}
      </ul>     
    </>
  );
};
export default SingleList;
