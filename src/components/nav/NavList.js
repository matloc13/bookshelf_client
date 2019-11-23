import React, {useEffect, useState, useContext} from "react";
import UserContext from './../../contexts/userContext';
import NavLink from "./../navlink/NavLink";
import useListGenerator from './../../hooks/useListGenerator';

const NavList = () => {
  const user = useContext(UserContext);
  const [get, setGet] = useState({});
  const [] = useListGenerator(get);
  useEffect(() => {
    if (user) {
      setGet({type: 'GET_LIST', payload: 'getting'});
    }
  }, [user])
  
  return (
    <nav>
      <NavLink to="/hotlist">hotlist</NavLink>
      <NavLink to="userlists">lists</NavLink>
    </nav>
  );
};
export default NavList;
