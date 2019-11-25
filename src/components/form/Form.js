import React, { useState, useEffect, useRef } from "react";
import useInput from "../../hooks/useInput";
import useAuth from "./../../hooks/useAuth";
import Label from "./label/Label";
import Input from "./inputs/Input";

const initUser = {
  user: {
    username: "",
    password: ""
  }
};

const Form = ({ formType }) => {
  const [handleInput, values] = useInput();
  const [formAcc, setFormAcc] = useState({});
  const [formInfo, setFormInfo] = useState(initUser);
  const [loading] = useAuth(formAcc);
  const isMounted = useRef(null)

  useEffect(() => {
    isMounted.current = true;
    setFormInfo({
      user: {
        username: values.username,
        password: values.password
      }
    });
    return ()=> {
      setFormAcc({})
      setFormInfo({})
      isMounted.current = false;
    }
  }, [values]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (formInfo.user.username === " ") {
        throw new Error("username cannot be empty");
      } else if (formInfo.user.password === " ") {
        throw new Error("password cannot be empty");
      }
    } catch (err) {
      console.error(err);
    } finally {
      if (isMounted.current) {
        if (formInfo.user.username !== " " && formInfo.user.passowrd !== " ") {
          switch (formType) {
            case "CREATE":
              return setFormAcc({ type: "CREATE", payload: formInfo });
            case "LOGIN":
              return setFormAcc({ type: "LOGIN", payload: formInfo });
            case "LOGOUT":
              return setFormAcc({ type: "LOGOUT" });
            default:
              throw new Error();
          }
        }
      }
     
    }
  };

  return (
    <>
      {loading && (
        <h1>
          <img
            src="https://media.giphy.com/media/5KX9jiNXkb3xK/giphy.gif"
            alt="loading"
          />
        </h1>
      )}
      {formType === "LOGOUT" ? (
        <form onSubmit={handleSubmit} className="form-style">
          <fieldset className={"fieldset-style"}>
            <Input
              id={formType}
              type="submit"
              name={formType}
              handleInput={handleInput}
            />
          </fieldset>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className={"form-style"}>
          <fieldset className={"fieldset-style"}>
            <Label name={"username"} />
              <Input
                id={formType}
                type={"text"}
                name={"username"}
                value={values.username}
                handleInput={handleInput}
              />

          </fieldset>

          <fieldset className={"fieldset-style"}>
            <Label name={"password"} />
            <Input
              id={formType}
              type={"password"}
              name={"password"}
              value={values.password}
              handleInput={handleInput}
            />

          </fieldset>
          <Input type={"submit"} name={formType} />
        </form>
      )}
    </>
  );
};

export default Form;
