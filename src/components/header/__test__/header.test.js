import React from 'react';
import ReactDom from 'react-dom';
import Header from './../Header';
import Nav from './../../nav/nav';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);
it('renders without crashing', () => {
    const header = document.createElement('header');
    ReactDom.render(<Header/>, header);
});

// it('renders header correctly', () => {
//     const {getByTestId} = render(<Header/>);
//     expect(getByTestId('header')).toContain(<Nav/>);
// });
