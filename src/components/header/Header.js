import React from "react";
import { Router, Link } from "@reach/router";
import Nav from "./../nav/Nav";
import NavList from "./../nav/NavList";
import Login from "./../login/Login";

const Header = () => {
  return (
    <header className={"header-style"} data-testid={"header"}>
      <Link to="/"><h1 className="logo">BGG-Lister</h1></Link>
      <b></b>
      <Router>
        <Nav path="/*" />
        <NavList path="user/*" />
      </Router>
      <b></b>
      <Login />
    </header>
  );
};

export default Header;
