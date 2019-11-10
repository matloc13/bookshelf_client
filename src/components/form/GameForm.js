import React, { useState, useContext } from "react";
import useInput from "../../hooks/useInput";
import UserContext from "./../../contexts/userContext";
import ListContext from "./../../contexts/listContext";
import useListGenerator from "./../../hooks/useListGenerator";
import Input from "./inputs/Input";
import Select from "react-select";

const initForm = {
  name: "",
  img: "",
  bggid: null
};

const GameForm = ({ formType, game }) => {
  const user = useContext(UserContext);
  const list = useContext(ListContext);
  const [handleInput, values] = useInput();
  const [formAcc, setFormAcc] = useState({});
  const [formInfo, setFormInfo] = useState(initForm);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showForm, itemRes, loading] = useListGenerator(formAcc);

  const handleSubmit = e => {
    e.preventDefault();
    setFormInfo({
      name: values.name,
      img: values.img,
      bggid: values.bggid
    });

    if (formInfo.name === " ") {
      throw new Error("username cannot be empty");
    } else if (formInfo.bggid === " ") {
      throw new Error("password cannot be empty");
    }
    if (formInfo.name !== " " && formInfo.bggid !== " ") {
      return setFormAcc({ type: "ADDGAME", payload: formInfo });
    } else {
      throw new Error("did not submit");
    }
  };

  const options = list.map(ele => {
    return ele.userid === user.id && { value: ele.id, label: ele.title };
  });

  const handleSelect = selectedOption => {
    setSelectedOption(selectedOption);
  };

  return (
    <>
      {loading ? (
        <h1>...Loading...</h1>
      ) : (
        <form onSubmit={handleSubmit} className={"form-style"}>
          <fieldset className={"fieldset-style"}>
            <Select
              options={options}
              onChange={handleSelect}
              value={selectedOption}
            />

            <Input
              id={formType}
              type={"hidden"}
              name={"name"}
              value={values.name}
              handleInput={handleInput}
            />

            <Input
              id={formType}
              type={"hidden"}
              name={"img"}
              value={values.img}
              handleInput={handleInput}
            />

            <Input
              id={formType}
              type={"hidden"}
              name="bggid"
              value={values.bggid}
              handleInput={handleInput}
            />

            <Input type={"submit"} name="Add Game" />
          </fieldset>
        </form>
      )}
    </>
  );
};

export default GameForm;
