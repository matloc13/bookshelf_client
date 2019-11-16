import React, { useContext, useState } from "react";
import ListContext from "./../../contexts/listContext";
import UserContext from "./../../contexts/userContext";
import useListGenerator from "./../../hooks/useListGenerator";

const UserList = () => {
  const user = useContext(UserContext);
  const allLists = useContext(ListContext);
  const [get, setGet] = useState({});
  const [loading] = useListGenerator(get);
  // console.log(list);

  let formatList = allLists.list.filter(ele => ele.user_id === user.id);

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
        {formatList &&
          formatList.map(ele => {
            return (
              <li key={ele.id}>
                <h1
                  onClick={() =>
                    setGet({
                      type: "GET_SINGLE_LIST",
                      payload: {
                        listid: ele.id,
                        userid: ele.user_id
                      }
                    })
                  }
                >
                  {ele.title}
                </h1>
                <div>
                  <span>update</span>
                  <span>delete</span>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default UserList;
