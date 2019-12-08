import React, {useContext} from "react";
import UserContext from './../../contexts/userContext';
import NavLink from "./../navlink/NavLink";

const Nav = () => {
  const user = useContext(UserContext);
  return (
    <nav className={"nav-style"} data-testid={"nav"}>
      <NavLink to="hotlist">Hot 50</NavLink>
      <NavLink to="search">Search</NavLink>
      {/* {
        user.isAuthenticated &&
          <NavLink to="user/">{user.username}</NavLink>
      } */}

    </nav>
  );
};

export default Nav;
