import React, { useState } from "react";
import Input from "./inputs/Input";
import Label from "./../form/label/Label";
import useInput from "../../hooks/useInput";
import useListGenerator from "./../../hooks/useListGenerator";
const initList = {
  title: "",
  game: {}
};

const NewListForm = ({ formType, game }) => {
  const [handleInput, values] = useInput();
  const [formInfo, setFormInfo] = useState(initList);
  const [formAcc, setFormAcc] = useState({});
  const [showForm, setShowFrom, item, loading] = useListGenerator(formAcc);

  const handleSubmit = e => {
    e.preventDefault();
    setFormInfo({ ...formInfo, title: values.title, game: game });

    if (formInfo.title === " ") {
      throw new Error("username cannot be empty");
    }
    if (formInfo.title !== " ") {
      console.log(formInfo);

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
          handleInput={handleInput}
        />
        <Input type="submit" name="New List" />
      </fieldset>
    </form>
  );
};
export default NewListForm;
