import React, { useContext } from "react";
import ListContext from "./../../contexts/listContext";
const UserList = () => {
  const list = useContext(ListContext);
  console.log(list);

  return (
    <div>
      <h1>userlist</h1>
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
