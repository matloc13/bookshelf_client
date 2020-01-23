import React, { useContext, useState, useEffect } from "react";
import { navigate } from "@reach/router";
import ListContext from "./../../contexts/listContext";
import UserContext from "./../../contexts/userContext";
import useListGenerator from "./../../hooks/useListGenerator";
import Loading from './../loading/Loading';
import FadeIn from 'react-fade-in';

const UserList = () => {
  const user = useContext(UserContext);
  const allLists = useContext(ListContext);
  
  useEffect(() => {
    setGet({ type: "GET_LIST", payload: "getting" });
    setcheck( check +1)
  },[]);


  const [get, setGet] = useState({});
  const [loading] = useListGenerator(get);
  const [check, setcheck] = useState(0);

  // if (check) {
  //   console.log(check);
    
  // }

  let formatList = allLists.list[0].filter(ele => ele.user_id === user.id)

useEffect(() => {
  if (formatList && formatList.length) {

  } else {
    if (check === 3) {

    } else {
      setGet({type: "GET_LIST", payload: "getting" });
      setcheck(check + 1)
    }
    
  }
  return () => {
   
  };
}, [allLists.list, formatList])

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
        : 
        <p>Please login in to see your a lists</p>
      }
      
      {loading && (
       <Loading />
      )}
      <ul className="user-lists">
        <FadeIn>
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
          </FadeIn>       
      </ul>
    </div>
  );
};
export default UserList;
