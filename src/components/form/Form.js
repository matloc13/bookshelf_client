import React, { useState } from "react";
import useInput from "../../hooks/useInput";
import useAuth from "./../../hooks/useAuth";
import Label from "./label/Label";
import Input from "./inputs/Input";

const Form = ({ formType }) => {
  const [handleInput, values] = useInput();
  const [formAcc, setFormAcc] = useState({});
  const [formInfo, setFormInfo] = useState({
    user: {
      username: "",
      password: ""
    }
  });
  const [user, isAuthenticated] = useAuth(formAcc);

  const handleSubmit = e => {
    e.preventDefault();
    setFormInfo({
      user: {
        username: values.username,
        password: values.password
      }
    });
    console.log(formInfo.user.username);
    console.log(formType);

    if (formInfo.user.username === " ") {
      throw new Error("username cannot be empty");
    } else if (formInfo.user.password === " ") {
      throw new Error("password cannot be empty");
    }
    switch (formType) {
      case "CREATE":
        return setFormAcc({ type: "CREATE", payload: formInfo });
      case "LOGIN":
        return setFormAcc({ type: "LOGIN", payload: formInfo });
      default:
        throw new Error();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={"form-style"}>
      <fieldset className={"fieldset-style"}>
        <Label name={"username"} />
        <Input
          type={"text"}
          name={"username"}
          value={values.username}
          handleInput={handleInput}
        />
      </fieldset>

      <fieldset className={"fieldset-style"}>
        <Label name={"password"} />
        <Input
          type={"password"}
          name={"password"}
          value={values.password}
          handleInput={handleInput}
        />
      </fieldset>
      <Input type={"submit"} name={formType} />
    </form>
  );
};

export default Form;
