import React, { useContext } from "react";
import { Router, Link } from "@reach/router";
import Nav from "./../nav/Nav";
import NavList from "./../nav/NavList";
import Login from "./../login/Login";
import UserNav from './../nav/UserNav';
import UserContext from "./../../contexts/userContext";

const Header = () => {
  const user = useContext(UserContext);
  return (
    <header className={"header-style"} data-testid={"header"}>
      <Link to="/"><h1 className="logo">BGG-Lister</h1></Link>
      <b></b>
      <Router>
        <Nav path="/*" />
        <NavList path="user/*" />
      </Router>
      <b></b>
      {
        user.isAuthenticated ?
        <UserNav />
        :
        <Login />
      }
     
    </header>
  );
};

export default Header;
