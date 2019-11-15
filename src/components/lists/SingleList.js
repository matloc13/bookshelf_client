import React, { useContext } from "react";
import DispatchContext from "./../../contexts/dispatchContext";
const SingleList = () => {
  const dispatch = useContext(DispatchContext);
  return (
    <>
      <h2>List Title placeholder</h2>
      <ul></ul>
    </>
  );
};
export default SingleList;
