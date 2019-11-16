import React, { useContext } from "react";
import ListContext from "./../../contexts/listContext";

const Modal = () => {
  const allLists = useContext(ListContext);
  console.log(allLists.current);
  // api request needed to load game from id.
  return (
    <div>
      {/* <>
        {allLists.current && (
          <div>
            <div>{allLists.current.name}</div>
            <img src="" alt="gameImg" />
          </div>
        )}
      </> */}
    </div>
  );
};
export default Modal;
