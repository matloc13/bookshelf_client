import React, { useContext, useState, useEffect } from "react";
import { navigate } from "@reach/router";
import ListContext from "./../../contexts/listContext";
import UserContext from "./../../contexts/userContext";
import useListGenerator from "./../../hooks/useListGenerator";

const UserList = () => {
  const user = useContext(UserContext);
  const allLists = useContext(ListContext);
  
  useEffect(() => {
    setGet({ type: "GET_LIST", payload: "getting" });
  },[]);



  const [get, setGet] = useState({});
  const [loading] = useListGenerator(get);

  let formatList = allLists.list[0].filter(ele => ele.user_id === user.id);

  const deleteItem = async ele => {
    try {
      await new Promise(resolve => {
        return resolve(
          setGet({
            type: "DELETE_LIST",
            payload: {
              listid: ele.id,
              userid: ele.user_id,
              lists: allLists.list
            }
          })
        );
      });
      // await navigate("/user");
      await new Promise(resolve => {
        return resolve(
          setGet({type: "GET_LIST", payload: "getting"})
        )
      })
    } catch (error) {
      console.error(error);
    }
 
  };

  return (
    <div className="user-lists-container">
      {
        user.isAuthenticated ?
        <h1>{user.username}'s boardgame lists</h1>
        : <p>Please login in to see your a lists</p>
      }
      
      {loading && (
        <img
          src="https://media.giphy.com/media/5KX9jiNXkb3xK/giphy.gif"
          alt="loading..."
        />
      )}
      <ul className="user-lists">
        {formatList ?
          formatList.map(ele => {
            return (
              <li key={ele.id} className="user-list-item">
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
                <div className="edit-title">
                  <span>update</span>
                  <span onClick={() => deleteItem(ele, formatList)}>
                    delete
                  </span>
                </div>
              </li>
            );
          }) : ""}         
      </ul>
    </div>
  );
};
export default UserList;
