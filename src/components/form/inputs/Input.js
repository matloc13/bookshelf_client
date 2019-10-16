import React from 'react';


const Input = ({type, name, handleInput, value}) => {
   
   
    return (
        <>
            <input 
                className={'input-style'}
                type={type}
                id={name}
                name={name}
                required
                value={type !== 'submit' ? value: name}
                onChange={handleInput}/>
        </>
    )
}

export default Input;