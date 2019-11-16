import React, {
  useReducer
} from "react";
import Header from "./components/header/Header";
import Hotlist from "./components/hotlist/Hotlist";
import UserList from "./components/lists/UserList";
import SingleList from "./components/lists/SingleList";
import userReducer from "./reducers/userReducer";
import singleListReducer from "./reducers/singleListReducer";
import listReducer from "./reducers/listReducer";
import currentReducer from "./reducers/currentReducer";
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
const initSingle = [];
const currentItem = {
  gameid: null,
  listid: null,
}

const App = () => {
  const [user, dispatchUser] = useReducer(userReducer, initUser);
  const [list, dispatchList] = useReducer(listReducer, initState);
  const [sList, dispatchSList] = useReducer(singleListReducer, initSingle);
  const [current, dispatchCurrent] = useReducer(currentReducer, currentItem);

  const dispatch = action => {
    [dispatchUser, dispatchList, dispatchSList, dispatchCurrent].forEach(fn =>
      fn(action)
    );
  };

  const allLists = {
    list,
    sList,
    current
  };

  return ( <
    DispatchContext.Provider value = {
      dispatch
    } >
    <
    UserContext.Provider value = {
      user
    } >
    <
    ListContext.Provider value = {
      allLists
    } >
    <
    div className = "App" >
    <
    h1 > BGG - Lister < /h1> <
    Header / >
    <
    UserList / >
    <
    SingleList / >
    <
    Hotlist / >
    <
    /div> <
    /ListContext.Provider> <
    /UserContext.Provider> <
    /DispatchContext.Provider>
  );
};

export default App;