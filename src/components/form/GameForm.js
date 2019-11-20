import React, { useState, useContext, useEffect } from "react";
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

const GameForm = ({ formType, game, i }) => {
  // console.log(game);

  const user = useContext(UserContext);
  const allLists = useContext(ListContext);
  const [formAcc, setFormAcc] = useState({});
  const [formInfo, setFormInfo] = useState(initForm);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading] = useListGenerator(formAcc);

  useEffect(() => {
    console.log(selectedOption);
    if (selectedOption) {
      setFormInfo({
        name: game.name.value,
        img: game.thumbnail.value,
        bggid: game.id,
        listname_id: selectedOption.value
      });
    }

    return () => {
      setFormInfo({});
    };
  }, [game, selectedOption]);

  const handleSubmit = e => {
    e.preventDefault();

    if (formInfo.name === " ") {
      throw new Error("username cannot be empty");
    } else if (formInfo.bggid === " ") {
      throw new Error("password cannot be empty");
    }
    if (formInfo.name !== " " && formInfo.bggid !== " ") {
      return setFormAcc({ type: "ADD_GAME", payload: formInfo });
    } else {
      throw new Error("did not submit");
    }
  };
  const optionlist = allLists.list.filter(ele => ele.user_id === user.id);

  const options = optionlist.map(ele => {
    return { value: ele.id, label: ele.title };
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

            <Input type={"submit"} name="Add Game" i={i} id={formType} />
          </fieldset>
        </form>
      )}
    </>
  );
};

export default GameForm;
