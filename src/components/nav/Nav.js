import React from "react";
import NavLink from "./../navlink/NavLink";

const Nav = () => {
  return (
    <nav className={"nav-style"} data-testid={"nav"}>
      <NavLink to="hotlist">Hot 50</NavLink>
      <NavLink to="search">Search</NavLink>
    </nav>
  );
};

export default Nav;
