import React, { useReducer } from "react";
import Header from "./components/header/Header";
import userReducer from "./reducers/userReducer";
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

  return (
    <DispatchContext.Provider value={dispatchUser}>
      <UserContext.Provider value={user}>
        <div className="App">
          <h1>hi</h1>

          <Header />
        </div>
      </UserContext.Provider>
    </DispatchContext.Provider>
  );
};

export default App;
