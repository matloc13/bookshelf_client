import React, { useState, useEffect } from "react";
import {toast} from 'react-toastify';
import Input from "./inputs/Input";
import useInput from "../../hooks/useInput";
import useListGenerator from "./../../hooks/useListGenerator";
import useManageItem from "./../../hooks/useManageItem";
const initList = {
  title: "",
  game: {}
};

const NewListForm = ({ formType, game, i, page  }) => {
  const [handleInput, values] = useInput();
  const [formInfo, setFormInfo] = useState(initList);
  const [formAcc, setFormAcc] = useState({});
  const [loading] = useListGenerator(formAcc);
  const [item, load, getItem] = useManageItem();

  const searchFormat = async () => {
    try {
      await getItem();
      await new Promise(resolve => {
        return setFormInfo({
          title: values.title,
          game: {
            name: game.name.value,
            img: item,
            bggid: game.id
          }
        })
      })
    } catch (error) {
      console.error(error);
      
    } finally {
      console.log(item);
      
    }
  

  }

  useEffect(() => {
    console.log(game);
    switch(page) {
      case "search":
       searchFormat();
       console.log(item);
       

        // setFormInfo({
        //   ...formInfo, 
        //   title: values.title,
        //   game: {
        //     name: game.name.value,
        //     img: item.thumbnail.value,
        //     bggid: game.id
        //   }
        // })
        break;
      case "hotlist":
        return    setFormInfo({
          ...formInfo,
          title: values.title,
          game: {
            name: game.name.value,
            img: game.thumbnail.value,
            bggid: game.id
          }
        });
      default:
        return;
    }
    
 
  }, [values, game]); //eslint-disable-line

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
      <form onSubmit={handleSubmit} className="form-style new-list-form">
        <fieldset>
          {/* <Label name="title"> */}
          <label htmlFor="title" className="label-style">title
          <Input
            id={formType}
            i={i}
            name="title"
            value={values.title}
            handleInput={handleInput}
          />
          </label>
          <Input type="submit" name="New List" id={formType} i={i} />
        </fieldset>
      </form>
    </>
  );
};
export default NewListForm;
