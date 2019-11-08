import React, { useContext } from "react";
import Form from "./../form/Form";
import UserContext from "./../../contexts/userContext";

const Nav = () => {
  const user = useContext(UserContext);
  return (
    <nav className={"nav-style"} data-testid={"nav"}>
      {user && <h1>{user.username}</h1>}
      <Form formType="LOGIN" />
      <Form formType="CREATE" />
    </nav>
  );
};

export default Nav;
