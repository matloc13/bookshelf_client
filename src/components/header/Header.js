import React from "react";
import { Router } from "@reach/router";
import Nav from "./../nav/Nav";
import NavList from "./../nav/NavList";
import Login from "./../login/Login";

const Header = () => {
  return (
    <header className={"header-style"} data-testid={"header"}>
      <h1>Bgg-Lister</h1>
      <Login />
      <Router>
        <Nav path="/*" />
        <NavList path="user/*" />
      </Router>
    </header>
  );
};

export default Header;
