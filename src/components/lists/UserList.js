import React, { useContext, useEffect, useState } from "react";
import ListContext from "./../../contexts/listContext";
import useListGenerator from "./../../hooks/useListGenerator";

const UserList = () => {
  const list = useContext(ListContext);
  const [get, setGet] = useState({});
  const [loading] = useListGenerator(get);
  console.log(list);
  useEffect(() => {}, []);

  return (
    <div>
      <h1 onClick={() => setGet({ type: "GET_LIST", payload: "getting" })}>
        userlist
      </h1>
      {loading && (
        <img
          src="https://media.giphy.com/media/5KX9jiNXkb3xK/giphy.gif"
          alt="loading..."
        />
      )}
      <ul>
        {list &&
          list.map(ele => {
            return (
              <li key={ele.id}>
                <h1>{ele.title}</h1>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default UserList;
