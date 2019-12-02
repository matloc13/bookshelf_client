import { useState, useCallback } from "react";

const useInput = () => {
  const [values, setValues] = useState(" ");


  const handleInput = e => {
    e.persist();
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };
 

  //  const handleInput = useCallback(
  //    (e) => {
  //     e.persist();
  //     setValues({
  //       ...values,
  //       [e.target.name]: e.target.value
  //     });
  //    },
  //    [values]
  //  )
 

 

  return [handleInput, values];
};

export default useInput;
