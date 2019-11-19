import React, { useContext, useState } from "react";
import DispatchContext from "./../../contexts/dispatchContext";
import ListContext from "./../../contexts/listContext";
import useManageItem from "./../../hooks/useManageItem";
import Modal from "./../modal/Modal";

const SingleList = () => {
  const dispatch = useContext(DispatchContext);
  const allLists = useContext(ListContext);
  const [del, setDel] = useState("waiting");
  const [response] = useManageItem(del);

  const [show, setShow] = useState(false);
  const [jsonResponse, setJsonResponse] = useState();
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
          return resolve(setDel("true"));
        });
        promise.then(alert(response)).finally(setDel("waiting"));
        break;
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
              <li>
                <h3 onClick={() => handleClick(ele, "cur")}>{ele.name}</h3>
                <span onClick={() => handleClick(ele, "del")}>X</span>
              </li>
            );
          })}
      </ul>
    </>
  );
};
export default SingleList;
