import React, { useContext, useEffect, useState } from "react";
import ListContext from "./../../contexts/listContext";
import useListGenerator from "./../../hooks/useListGenerator";
// import DispatchContext from "./../../contexts/dispatchContext";
// import useLists from "./../../hooks/useLists";
const UserList = () => {
  const list = useContext(ListContext);
  // const [lists, loading, getLists] = useLists();
  const [get, setGet] = useState({});
  const [loading] = useListGenerator(get);
  console.log(list);
  useEffect(() => {}, []);

  return (
    <div>
      <h1 onClick={() => setGet({ type: "GET_LIST", payload: "getting" })}>
        userlist
      </h1>
      {loading && <h1>...Loading</h1>}
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
