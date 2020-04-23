import React from 'react';

const Input = ({ type, name, handleInput, value, id, i }) => {
    return (
        <>
            <input
                className={type === 'submit' ? 'submit-input' : 'input-style'}
                type={type}
                id={`${i}${id}${name}`}
                name={name}
                required
                value={type !== 'submit' ? value : name}
                onChange={handleInput}
            />
        </>
    );
};

export default Input;
