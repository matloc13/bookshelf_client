import React from 'react';
import ReactDom from 'react-dom';
import Nav from './../Nav';



it ('renders without crashing' , () => {
    const nav = document.createElement('nav');
    ReactDom.render(<Nav/>, nav);
})