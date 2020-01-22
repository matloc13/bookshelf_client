import React, { useState } from "react";
import Form from "./../form/Form";

const Login = () => {
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
    <div>
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
    </div>
  );
};
export default Login;
