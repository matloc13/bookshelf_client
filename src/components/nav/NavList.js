import React, {useEffect, useState, useContext} from "react";
import UserContext from './../../contexts/userContext';
import NavLink from "./../navlink/NavLink";
import useListGenerator from './../../hooks/useListGenerator';

const NavList = () => {
  const user = useContext(UserContext);
  const [get, setGet] = useState({});
  const [cuser, setCuser] = useState({})
  const [] = useListGenerator(get); //eslint-disable-line

  useEffect(() => {

    if (!user.isAuthenticated) {
      setCuser({})
    } else {
      setCuser({...cuser, user})
      setGet({type: 'GET_LIST', payload: 'getting'});
    }
    
    return () => {
      setCuser({})
    }
  }, [user])
  
  return (
    <nav className="nav-style">
      <NavLink to="/hotlist">main</NavLink>
      {/* <NavLink to="userlists">lists</NavLink> */}
    </nav>
  );
};
export default NavList;
