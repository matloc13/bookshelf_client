import React, { useContext } from "react";
import ListContext from "./../../contexts/listContext";

const Modal = () => {
  const allLists = useContext(ListContext);
  return (
    <div>
      <>
        {allLists.current && (
          <div>
            <div>{allLists.current.name}</div>
            <img
              src={
                allLists.current.img
                  ? allLists.current.img
                  : allLists.current.thumbnail.value
              }
              alt="gameImg"
            />
          </div>
        )}
      </>
    </div>
  );
};
export default Modal;
