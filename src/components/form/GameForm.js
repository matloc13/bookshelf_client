import React, { useState, useContext } from "react";
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
  // console.log(game);

  const user = useContext(UserContext);
  const list = useContext(ListContext);
  const [formAcc, setFormAcc] = useState({});
  const [formInfo, setFormInfo] = useState(initForm);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showForm, setShowForm, item, loading] = useListGenerator(formAcc);

  const handleSubmit = e => {
    e.preventDefault();
    setFormInfo({
      name: game.name.value,
      img: game.thumbnail.value,
      bggid: game.id
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
              className={`select-${formType}`}
              options={options}
              onChange={handleSelect}
              value={selectedOption}
            />

            <Input type={"submit"} name="Add Game" />
          </fieldset>
        </form>
      )}
    </>
  );
};

export default GameForm;
