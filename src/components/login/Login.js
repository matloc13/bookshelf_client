import React, { useState, useContext } from "react";
// import { Router } from "@reach/router";`
import Form from "./../form/Form";
import NavLink from "./../navlink/NavLink";
import UserContext from "./../../contexts/userContext";


const Login = () => {
  const user = useContext(UserContext);
  const [signup, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);
  const [logout, setLogout] = useState(false)

  const toggle = e => {
    e.persist();
    switch (e.target.id) {
      case "login":
        return setLogin(!login);
      case "signup":
        return setSignUp(!signup);
      case "logout": 
        return setLogout(!logout)
      default:
        return;
    }
  };
  return (
    <div>
      {user.isAuthenticated ? (
        <div className="logoutdiv">
          <nav>
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
        </div>
      ) : (
        <div>
          <>
            {login ? (
              <>
                <Form formType="LOGIN" />
                <span onClick={toggle} id="login">
                  X
                </span>
              </>
            ) : (
              <span onClick={toggle} id="login">
                Login
              </span>
            )}
          </>
       
        </div>
      )}
    </div>
  );
};
export default Login;
