import React from 'react';
import ReactDom from 'react-dom'
import Input from './../Input';


it ('renders without crashing', () => {
    const input = document.createElement('input');
    ReactDom.render(<Input/>, input);
})