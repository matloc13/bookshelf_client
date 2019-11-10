import React, { useState } from "react";
import useInput from "../../hooks/useInput";
import useListGenerator from "./../../hooks/useListGenerator";
import Input from "./inputs/Input";
import Label from "./../form/label/Label";
const NewListForm = ({ formType }) => {
  const [handleInput, values] = useInput();
  const [showForm, itemRes, loading] = useListGenerator();
  const [formInfo, setFormInfo] = useState("");
  const [formAcc, setFormAcc] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    setFormInfo({
      title: values.title
    });
    // console.log(formInfo.user.username);
    // console.log(formType);
    if (formInfo.title === " ") {
      throw new Error("username cannot be empty");
    }
    if (formInfo.titele !== " ") {
      return setFormAcc({ type: "NEWLIST", payload: formInfo });
    } else {
      throw new Error("did not submit");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <Label name="title" />
        <Input
          id={formType}
          name="title"
          value={values.title}
          handleChange={handleInput}
        />
        <Input type="submit" name="New List" />
      </fieldset>
    </form>
  );
};
export default NewListForm;
