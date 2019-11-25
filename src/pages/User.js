import React, {useEffect, useContext} from "react";
import { Router } from "@reach/router";
import {toast }from 'react-toastify';
import UserContext from './../contexts/userContext';
import ListContext from './../contexts/listContext';
import UserHome from "./UserHome";
import SingleList from "./../components/lists/SingleList";
import UserList from "./../components/lists/UserList";
const User = () => {
  const user = useContext(UserContext);
  const allLists = useContext(ListContext);
  useEffect(() => {
    let formatList = allLists.list[0].filter(ele => ele.user_id === user.id); 
    if (user.username) {
      notify(`${user.username} has ${formatList.length} lists`);
    }
  }, []) //eslint-disable-line
const notify = (item) => {
  toast(`${item}`)
}
  return (
    <main className="user-main">
      <Router>
        <UserHome path="/" />
        <UserList path="userlists/" />
        <SingleList path="list" />
      </Router>
    </main>
  );
};
export default User;
