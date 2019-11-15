import React, { useContext } from "react";
import DispatchContext from "./../../contexts/dispatchContext";
const SingleList = () => {
  const dispatch = useContext(DispatchContext);
  return (
    <ul>
      <li></li>
    </ul>
  );
};
export default SingleList;
