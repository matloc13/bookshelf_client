import React, { useContext, useState } from "react";
import Form from "./../form/Form";
import UserContext from "./../../contexts/userContext";

const Nav = () => {
  const user = useContext(UserContext);
  const [signup, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);

  const toggle = e => {
    e.persist();
    switch (e.target.id) {
      case "login":
        return setLogin(!login);
      case "signup":
        return setSignUp(!signup);
      default:
        return;
    }
  };
  return (
    <nav className={"nav-style"} data-testid={"nav"}>
      {user.isAuthenticated ? (
        <div>
          <h1>{user.username}</h1>
          <Form formType="LOGOUT" />
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
          <>
            {signup ? (
              <>
                <Form formType="CREATE" />
                <span onClick={toggle} id="signup">
                  X
                </span>
              </>
            ) : (
              <span onClick={toggle} id="signup">
                Sign Up
              </span>
            )}
          </>
        </div>
      )}
    </nav>
  );
};

export default Nav;
