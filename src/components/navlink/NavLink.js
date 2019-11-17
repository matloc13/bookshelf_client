import React from "react";
import { Link } from "@reach/router";
const NavLink = props => {
  return (
    <Link
      {...props}
      getProps={({ isCurrent }) => {
        return {
          style: {
            color: isCurrent ? "gold" : "green",
            fontWeight: isCurrent ? 900 : 300
          }
        };
      }}
      className="navlink"
    />
  );
};
export default NavLink;
