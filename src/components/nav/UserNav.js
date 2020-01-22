import React, {useContext, useState } from 'react';
import NavLink from './../navlink/NavLink';
import Form from './../form/Form';
import UserContext from './../../contexts/userContext';
import useListGenerator from './../../hooks/useListGenerator';
// import ListContext from './../../contexts/listContext';
const UserNav = () => {

  const user = useContext(UserContext);

  // const allists = useContext(ListContext);
  const [logout, setLogout] = useState(false);
  const [get, setGet] = useState({})
  const [loading] = useListGenerator(get)
  const toggle = (e) => {
        return setLogout(!logout)
    };

    const loadLists = () => {
      setGet({ type: "GET_LIST", payload: "getting" })
    }

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
                <NavLink to="user/userlists" onClick={loadLists}>Lists</NavLink>}
            </span>
            <span>
               {logout &&  <Form formType="LOGOUT" />}
            </span>
      </nav>  
      {
        loading && 
        <h5>...loading</h5>
      }
    </nav>
  )
}
export default UserNav; 