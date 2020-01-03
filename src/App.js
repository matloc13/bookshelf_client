import React, { useReducer, useEffect } from "react";
import { Router } from "@reach/router";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css'
import ErrorBoundary from './errorboundaries/ErrorBoundary';
import Header from "./components/header/Header";
import Hotlist from "./pages/Hotlist";
import Search from './pages/Search';
import User from "./pages/User";
import UserHome from "./pages/UserHome";
import Home from "./pages/Home";
import Footer from './components/footer/Footer';
import UserList from "./components/lists/UserList";
import SingleList from "./components/lists/SingleList";
// import StoreContext from './contexts/index';
import userReducer from "./reducers/userReducer";
import singleListReducer from "./reducers/singleListReducer";
import listReducer from "./reducers/listReducer";
import currentReducer from "./reducers/currentReducer";
import searchReducer from "./reducers/searchReducer";
import DispatchContext from "./contexts/dispatchContext";
// import storeReducer from "./reducers/index";
// import DispatchProvider from './reducers/index';
import "./scss/App.scss";
import UserContext from "./contexts/userContext";
import ListContext from "./contexts/listContext";

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

toast.configure({
  autoClose: 3200,
  draggable: false,
  position: 'bottom-right'
});

const App = () => {
  const [user, dispatchUser] = useReducer(userReducer, initUser);
  const [list, dispatchList] = useReducer(listReducer, initState);
  const [sList, dispatchSList] = useReducer(singleListReducer, initSingle);
  const [current, dispatchCurrent] = useReducer(currentReducer, currentItem);
  const [search, dispatchSearch] = useReducer(searchReducer, initSearch)

  // const [store, dispatchStore] = useReducer(storeReducer,)

  useEffect(() => {
    if (user.username) {
      notify(`${user.username} has logged in successfully`)
    } else {
      notify(`You have successfully logged out.`)
    }
  }, [user])

  const dispatch = action => {
    [dispatchUser, dispatchList, dispatchSList, dispatchCurrent, dispatchSearch].forEach(fn =>
      fn(action)
    );
  };

  const allLists = { list, sList, current, search };

  const notify = (item) => {
    toast(`${item}`)
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserContext.Provider value={user}>
        <ListContext.Provider value={allLists}>
          <div className="App home" id="modal">
          <ErrorBoundary>
            <Header />
          </ErrorBoundary>
          
            <Router>
                <Home path="/"/>
                <Hotlist path="hotlist" />
                <Search path="search"/>
                <User path="user">
                  <UserHome path="/" />
                  <UserList path="userlists" />
                  <SingleList path="list" />
                </User>            
            </Router>

            <Footer />

          </div>
        </ListContext.Provider>
      </UserContext.Provider>
    </DispatchContext.Provider>
  )
};

export default App;

