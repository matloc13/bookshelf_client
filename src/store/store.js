import React,{ useReducer } from 'react';
import App from './../App';
import {
  userReducer, 
  singleListReducer, 
  listReducer, 
  currentReducer, 
  searchReducer} 
  from "./../reducers/index";

import { DispatchContext, UserContext, ListContext} from './../contexts/index';
const initUser = {
  id: null,
  username: "",
  token: null,
  isAuthenticated: false
};

const initSearch = {
  searchResults: [],
  searchLength: 1
};
const initState = [[]];
const initSingle = [];
const currentItem = {
  gameid: null,
  listid: null,
  gameuserid: null
};

const Store = () => {

  const [user, dispatchUser] = useReducer(userReducer, initUser);
  const [list, dispatchList] = useReducer(listReducer, initState);
  const [sList, dispatchSList] = useReducer(singleListReducer, initSingle);
  const [current, dispatchCurrent] = useReducer(currentReducer, currentItem);
  const [search, dispatchSearch] = useReducer(searchReducer, initSearch);

  const allLists = { list, sList, current, search };

  const dispatch = action => {
    [dispatchUser, dispatchList, dispatchSList, dispatchCurrent, dispatchSearch].forEach(fn =>
      fn(action)
    );
  };
  return (
    <UserContext.Provider value={user}>
      <ListContext.Provider value={allLists}>
        <DispatchContext.Provider value={dispatch}>
          <App />
        </DispatchContext.Provider>
      </ListContext.Provider>
    </UserContext.Provider>
  )

}



export default Store;