import React, { useState, useEffect } from "react";
import Input from "./inputs/Input";
import Label from "./../form/label/Label";
import useInput from "../../hooks/useInput";
import useListGenerator from "./../../hooks/useListGenerator";
const initList = {
  title: "",
  game: {}
};

const NewListForm = ({ formType, game, i }) => {
  const [handleInput, values] = useInput();
  const [formInfo, setFormInfo] = useState(initList);
  const [formAcc, setFormAcc] = useState({});
  const [loading] = useListGenerator(formAcc);

  useEffect(() => {
    setFormInfo({
      ...formInfo,
      title: values.title,
      game: {
        name: game.name.value,
        img: game.thumbnail.value,
        bggid: game.id
      }
    });
  }, [values]);

  const handleSubmit = e => {
    e.preventDefault();

    if (formInfo.title === " ") {
      throw new Error("username cannot be empty");
    }
    if (formInfo.title !== " ") {
      // console.log(formInfo);
      return setFormAcc({ type: "CREATE_LIST", payload: formInfo });
    } else {
      throw new Error("did not submit");
    }
  };
  return (
    <>
      {loading && (
        <div>
          <h2>...LOADING...</h2>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <Label name="title" />
          <Input
            id={formType}
            i={i}
            name="title"
            value={values.title}
            handleInput={handleInput}
          />
          <Input type="submit" name="New List" id={formType} i={i} />
        </fieldset>
      </form>
    </>
  );
};
export default NewListForm;
