import React, {useContext, useState } from 'react';
import NavLink from './../navlink/NavLink';
import Form from './../form/Form';
import UserContext from './../../contexts/userContext';
// import ListContext from './../../contexts/listContext';
const UserNav = () => {

  const user = useContext(UserContext);
  // const allists = useContext(ListContext);
  const [logout, setLogout] = useState(false);

  const toggle = (e) => {
        return setLogout(!logout)
    };

  return (
    <nav className="user-nav">
      <nav className="logoutdiv">
          <span 
              className={`user-nav ${logout && "close"}`}
              onClick={toggle}
              id="logout">
                {
                  logout ? "hide" : user.username
                }
            </span>

            <span>
              {logout && 
                <NavLink to="user/userlists">{user.username}'s lists</NavLink>}
            </span>
            <span>
               {logout &&  <Form formType="LOGOUT" />}
            </span>
      </nav>  
    </nav>
  )
}
export default UserNav; 