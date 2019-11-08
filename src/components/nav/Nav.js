import React from "react";
import Form from "./../form/Form";

const Nav = () => {
  return (
    <nav className={"nav-style"} data-testid={"nav"}>
      <Form formType="LOGIN" />
      <Form formType="CREATE" />
    </nav>
  );
};

export default Nav;
