import React from "react";
import { Router, Link } from "@reach/router";
import Nav from "./../nav/Nav";
import NavList from "./../nav/NavList";
import Login from "./../login/Login";

const Header = () => {
  return (
    <header className={"header-style"} data-testid={"header"}>


        <Link to="/hotlist"><h1>BGG-Lister</h1></Link>

      <Login />
      <Router>
        <Nav path="/*" />
        <NavList path="user/*" />
      </Router>
    </header>
  );
};

export default Header;
