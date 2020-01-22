import React, { useEffect, useContext, useState, useRef } from "react";
import DispatchContext from "../contexts/dispatchContext";
import UserContext from "../contexts/userContext";
import useHotlist from "../hooks/useHotlist";
import GameInfo from '../components/modal/gameInfo';
import GameForm from "../components/form/GameForm";
import NewListForm from "../components/form/NewListForm";
import Loading from "./../components/loading/Loading";
import useListGenerator from "../hooks/useListGenerator";
import { toast } from "react-toastify";

const Hotlist = () => {
  const isMounted = useRef(null);
  const dispatch = useContext(DispatchContext);
  const user = useContext(UserContext);

  const [hotlist, loading, getHotlist] = useHotlist();
  const [get, setGet] = useState({});
  const [gameForm, setGameForm] = useState(false);
  const [newList, setNewList] = useState(false);
  const [gameInfo, setGameInfo] = useState(false);
  const [focusCurrent, setFocusCurrent] = useState({id:null})
  const [] = useListGenerator(get); //eslint-disable-line
  const notify = (item) => {
    toast(item)
  }
  isMounted.current = true;
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, [])
  
  const handleClick = (e, ele) => {
    switch (e.target.id) {
      case "img":
        dispatch({ type: "SET_CURRENT_GAME", game: ele.id });
        // setShow(!show);
        setFocusCurrent({id: ele.id})
        setGameInfo(true);
        break;
      case "addtolist":
        if (user.isAuthenticated && ele.id) {
          setFocusCurrent({id: ele.id})
          return setGameForm(!gameForm);
        } else {
          return notify('Please Login')
        }
    
      case "newlist":
          if (user.isAuthenticated && ele.id) {
            setFocusCurrent({id: ele.id})
            return setNewList(!newList);
          } else {
            return notify('Please Login')
          }     
      default:
        return;
    }
  };

  useEffect(() => {
      getHotlist();
      return () => {}
  }, []); //eslint-disable-line

  useEffect(() => {
    if (user) {
      console.log('gettinglist');
      
      setGet({ type: "GET_LIST", payload: "getting" });
    }
    return () => {
      console.log('checked for user');
    }
  }, [user]);

  return (
    <main className="hotlist-container">

      <h2>Hot 50</h2>
      <aside className="loading-div">
        {loading && (
         <Loading />
        )}
      </aside>
      <>
     
        {hotlist.items &&
          hotlist.items.item.map((ele, index) => {
            return (
              <div key={`${ele.rank}`} className="hotlist-item">
                <div key={`${index}${ele.name.value}`}>
                  <img
                    id="img"
                    src={ele.thumbnail.value}
                    alt={ele.name.value}
                    onClick={e => handleClick(e, ele)}
                  />
                  <span className="rank">RANK: {ele.rank}</span>
                </div>
                <b></b>
                <div className="add-button-container" key={index + "button" }>
                  <span 
                  id="addtolist" 
                  className="add-button"
                  onClick={e => handleClick(e,ele)}>
                    { focusCurrent.id === ele.id && gameForm ? "close" : " add to list"}
                  </span>
                  <span 
                  id="newlist" 
                  className="add-button"
                  onClick={e => handleClick(e,ele)}>
                    { focusCurrent.id === ele.id && newList ? "close" : "new list"}
                  </span>
                </div>
           <div key={index + "form"}>    
                <>
                  {gameForm && focusCurrent.id === ele.id && (
                    <GameForm 
                      formType="ADDGAME" 
                      game={ele} 
                      i={index} 
                      set={setGameForm}
                      gameForm={gameForm}
                      page={'hotlist'}
                      />
                  )}
                </>
                <>
                  {newList && focusCurrent.id === ele.id &&  (

                    <NewListForm 
                      formType="NewList"
                      game={ele} 
                      i={index}
                      set={setNewList}
                      newList={newList}
                      page="hotlist"
                    />
                  )}
                </>
                </div> 
                <>
                    {gameInfo && ele.id === focusCurrent.id && 
                   gameInfo && <GameInfo set={setGameInfo} gameInfo={gameInfo}/>}
                </>
                
              </div>
            );
          })}
    
      </>

    </main>
  );
};
export default Hotlist;
