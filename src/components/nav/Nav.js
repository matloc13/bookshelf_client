import React from 'react';
import Form from './../form/Form';
import useStateValue from './../../contexts/state';


const Nav = () => {
    const [{state}, dispatch] = useStateValue();
    return (
        <nav className={'nav-style'} data-testid={'nav'}>

            <h1>{state.username}</h1>
            <Form
                formType={'Login'}
            />
            {/* <Form 
                formType={'Sign Up'}
            /> */}
        </nav>
    )
}

export default Nav;