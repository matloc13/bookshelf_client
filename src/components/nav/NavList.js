import React from "react";
import NavLink from "./../navlink/NavLink";
const NavList = () => {
  return (
    <nav>
      <NavLink to="userlists">lists</NavLink>
      {/* <NavLink to="list">list</NavLink> */}
      <NavLink to="/hotlist">hotlist</NavLink>
    </nav>
  );
};
export default NavList;
