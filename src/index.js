import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {StateProvider} from './contexts/state';

const initState = {
    username: 'default',
    password: 'password',
    userLoggedIn: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_USERNAME':
            return {
                ...state, username: action.username
            };
        case 'ADD_PASSWORD':
            return {
                ...state, password: action.password
            };
        default: return state;

    }
};

ReactDOM.render(
    <StateProvider initState={initState} reducer={reducer}>
        <App />
    </StateProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
