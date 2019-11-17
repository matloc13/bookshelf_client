import React from "react";
import { Router } from "@reach/router";
import UserHome from "./UserHome";
import SingleList from "./../components/lists/SingleList";
import UserList from "./../components/lists/UserList";
const User = () => {
  return (
    <main>
      <Router>
        <UserHome path="/" />
        <UserList path="userlists/" />
        <SingleList path="list" />
      </Router>
    </main>
  );
};
export default User;
