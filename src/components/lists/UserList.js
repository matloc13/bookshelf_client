import React, { useContext, useState, useEffect } from "react";
import { navigate } from "@reach/router";
import ListContext from "./../../contexts/listContext";
import UserContext from "./../../contexts/userContext";
import useListGenerator from "./../../hooks/useListGenerator";

const UserList = () => {
  const user = useContext(UserContext);
  useEffect(() => {
    setGet({ type: "GET_LIST", payload: "getting" });
  }, []);

  const allLists = useContext(ListContext);
  const [get, setGet] = useState({});
  const [loading] = useListGenerator(get);

  let formatList = allLists.list.filter(ele => ele.user_id === user.id);

  return (
    <div>
      <h1>{user.username}'s lists</h1>
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
                <span
                  onClick={async () => {
                    setGet({
                      type: "GET_SINGLE_LIST",
                      payload: {
                        listid: ele.id,
                        userid: ele.user_id
                      }
                    });
                    await navigate("/user/list");
                  }}
                >
                  {ele.title}
                </span>
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
