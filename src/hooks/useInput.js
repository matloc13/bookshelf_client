import { useState } from "react";

const useInput = () => {
  const [values, setValues] = useState(" ");

  const handleInput = e => {
    e.persist();
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  // const clear = () => {
  //   setValues("");
  // };

  return [handleInput, values];
};

export default useInput;
