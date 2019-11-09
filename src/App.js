import React, { useReducer } from "react";
import uuid from "uuid";
import Header from "./components/header/Header";
import Hotlist from "./components/hotlist/Hotlist";
import userReducer from "./reducers/userReducer";
import listReducer from "./reducers/listReducer";
import DispatchContext from "./contexts/dispatchContext";
import "./App.css";
import UserContext from "./contexts/userContext";
const initUser = {
  id: null,
  username: "",
  token: null,
  isAuthenticated: false
};
const App = () => {
  const [user, dispatchUser] = useReducer(userReducer, initUser);
  const [list, dispatchList] = useReducer(listReducer, null);

  return (
    <DispatchContext.Provider value={dispatchUser}>
      <UserContext.Provider value={user}>
        <div className="App">
          <h1>BGG-Lister</h1>

          <Header />
          <Hotlist />
        </div>
      </UserContext.Provider>
    </DispatchContext.Provider>
  );
};

export default App;
