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
 
  return {values, handleInput};
};

export default useInput;
