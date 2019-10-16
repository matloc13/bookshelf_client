import React from 'react';
import Form from './../form/Form';
const Nav = () => {
    return (
        <nav className={'nav-style'} data-testid={'nav'}>
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