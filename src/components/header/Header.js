import React from 'react';
import Nav from './../nav/Nav';

const Header = () => {
    return (
        <header className={'header-style'} data-testid={'header'}>
            <Nav />
        </header>
    )
}

export default Header;