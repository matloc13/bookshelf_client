import React, { useContext, useEffect, useState } from "react";
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
import { UserContext } from './contexts/index';
import "./scss/App.scss";
import useLocalStorage from './hooks/useLocalStorage';



toast.configure({
  autoClose: 3200,
  draggable: false,
  position: 'bottom-right'
});

const App = () => {
    const user = useContext(UserContext);
    const [check, setCheck] = useState(false)
    const [verified] = useLocalStorage(check);


useEffect(() => {
  setCheck(true);
  return () => {
    setCheck(false)
  };
}, [])

  useEffect(() => {
    if (user.isAuthenticated) {
    //   setCheck(true)
      notify(`${user.username} has logged in successfully`)
    } else {
      notify(`You have successfully logged out.`)
    }
  }, [user])

  



  const notify = (item) => {
    toast(`${item}`)
  }

  return (
 
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
  )
};

export default App;

