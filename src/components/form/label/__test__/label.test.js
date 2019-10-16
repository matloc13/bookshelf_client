import React from 'react';
import ReactDom from 'react-dom';
import Label from './../Label';

it ('renders without crashing', () => {
    const label = document.createElement('label');
    ReactDom.render(<Label/>, label);
});