import React, { useReducer } from "react";

import Header from "./components/header/Header";
import Hotlist from "./components/hotlist/Hotlist";
import UserList from "./components/lists/UserList";
import userReducer from "./reducers/userReducer";
import listReducer from "./reducers/listReducer";
import listItemReducer from "./reducers/listItemReducer";
import DispatchContext from "./contexts/dispatchContext";
import "./App.css";
import UserContext from "./contexts/userContext";
import ListContext from "./contexts/listContext";

const initUser = {
  id: null,
  username: "",
  token: null,
  isAuthenticated: false
};
const initState = [];
const initItem = {};

const App = () => {
  const [user, dispatchUser] = useReducer(userReducer, initUser);
  const [list, dispatchList] = useReducer(listReducer, initState);
  const [listItem, dispatchListItem] = useReducer(listItemReducer, initItem);

  const dispatch = action => {
    [dispatchUser, dispatchList, dispatchListItem].forEach(fn => fn(action));
  };

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserContext.Provider value={user}>
        <ListContext.Provider value={list}>
          <div className="App">
            <h1>BGG-Lister</h1>

            <Header />
            <UserList />
            <Hotlist />
          </div>
        </ListContext.Provider>
      </UserContext.Provider>
    </DispatchContext.Provider>
  );
};

export default App;
