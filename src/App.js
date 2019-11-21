import React, { useReducer } from "react";
import { Router } from "@reach/router";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css'
import Header from "./components/header/Header";
import Hotlist from "./components/hotlist/Hotlist";
import User from "./pages/User";
import UserHome from "./pages/UserHome";
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
  gameuserid: null
};

toast.configure({
  autoClose: 3200,
  draggable: false
});

const App = () => {
  const [user, dispatchUser] = useReducer(userReducer, initUser);
  const [list, dispatchList] = useReducer(listReducer, initState);
  const [sList, dispatchSList] = useReducer(singleListReducer, initSingle);
  const [current, dispatchCurrent] = useReducer(currentReducer, currentItem);
  console.log(sList);

  const dispatch = action => {
    [dispatchUser, dispatchList, dispatchSList, dispatchCurrent].forEach(fn =>
      fn(action)
    );
  };

  const allLists = { list, sList, current };

  const notify = (item) => {
    toast(`${item}`)
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserContext.Provider value={user}>
        <ListContext.Provider value={allLists}>
        
          <div className="App">
            <Header />
            <Router>
              <Hotlist path="hotlist" />
              <User path="user">
                <UserHome path="/" />
                <UserList path="userlists" />
                <SingleList path="list" />
              </User>
            </Router>
          </div>
         
        </ListContext.Provider>
      </UserContext.Provider>
    </DispatchContext.Provider>
  );
};

export default App;
