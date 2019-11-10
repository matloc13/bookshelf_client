import React, { useState } from "react";
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

  const handleSubmit = e => {
    e.preventDefault();
    setFormInfo({
      user: {
        username: values.username,
        password: values.password
      }
    });

    if (formInfo.user.username === " ") {
      throw new Error("username cannot be empty");
    } else if (formInfo.user.password === " ") {
      throw new Error("password cannot be empty");
    }
    if (formInfo.user.username !== " " && formInfo.user.passowrd !== " ") {
      switch (formType) {
        case "CREATE":
          return setFormAcc({ type: "CREATE", payload: formInfo });
        case "LOGIN":
          return setFormAcc({ type: "LOGIN", payload: formInfo });
        default:
          throw new Error();
      }
    }
  };

  return (
    <>
      {loading ? (
        <h1>...Loading...</h1>
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
