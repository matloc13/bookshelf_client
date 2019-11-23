import React, { useState, useEffect } from "react";
import {toast} from 'react-toastify';
import Input from "./inputs/Input";
import Label from "./../form/label/Label";
import useInput from "../../hooks/useInput";
import useListGenerator from "./../../hooks/useListGenerator";
const initList = {
  title: "",
  game: {}
};

const NewListForm = ({ formType, game, i, set, newList }) => {
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
      console.log(formInfo);
      notify(` ${formInfo.game.name} added to new list ${formInfo.title}`)
      return setFormAcc({ type: "CREATE_LIST", payload: formInfo });
     
      // set(!newList);

    } else {
      throw new Error("did not submit");
    }
  };

  const notify = item => {
    toast(`${item}`);
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
