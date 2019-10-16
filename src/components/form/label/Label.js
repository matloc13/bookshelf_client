import React from 'react';

const Label = ({name}) => {
    return (
        <label htmlFor={name} className={'label-style'}><span className={'content-style'}>{name}</span></label>
    )
}

export default Label;