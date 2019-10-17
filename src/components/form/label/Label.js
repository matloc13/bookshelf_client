import React from 'react';

const Label = ({name}) => {
    return (
        <label htmlFor={name} className={'label-style'}></label>
    )
}

export default Label;