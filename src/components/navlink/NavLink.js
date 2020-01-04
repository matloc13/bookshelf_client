import React from "react";
import { Link } from "@reach/router";
const NavLink = props => {
  return (
    <Link
      {...props}
      getProps={({ isCurrent }) => {
        return {
          style: {
            color: isCurrent ? 'rgb(255, 81, 0)' : "white",
            fontWeight: isCurrent ? 300 : 900,
            textDecoration: 'none'
          }
        };
      }}
      className="navlink"
    />
  );
};
export default NavLink;
