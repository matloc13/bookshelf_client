import React, { useEffect, useContext, useState } from "react";
import DispatchContext from "./../../contexts/dispatchContext";
import UserContext from "./../../contexts/userContext";
import useHotlist from "./../../hooks/useHotlist";
import Modal from "./../modal/Modal";
import GameForm from "./../form/GameForm";
import NewListForm from "./../form/NewListForm";
import useListGenerator from "../../hooks/useListGenerator";
import { toast } from "react-toastify";

const Hotlist = () => {
  const dispatch = useContext(DispatchContext);
  const user = useContext(UserContext);

  const [hotlist, loading, getHotlist] = useHotlist();
  const [get, setGet] = useState({});
  const [show, setShow] = useState(false);
  const [gameForm, setGameForm] = useState(false);
  const [newList, setNewList] = useState(false);
  const [focusCurrent, setFocusCurrent] = useState({id:null})
  const [] = useListGenerator(get); //eslint-disable-line
  const notify = (item) => {
    toast(item)
  }
  const handleClick = (e, ele) => {
    switch (e.target.id) {
      case "img":
        dispatch({ type: "SET_CURRENT_GAME", game: ele.id });
        setShow(!show);
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
  }, []); //eslint-disable-line

  useEffect(() => {
    if (user) {
      setGet({ type: "GET_LIST", payload: "getting" });
    }
  }, [user]);

  return (
    <main className="hotlist-container">
      {show && <Modal setShow={setShow} show={show}/>}

      <h2>Hot 50</h2>
      <div>
        {loading && (
          <img
            src="https://media.giphy.com/media/5KX9jiNXkb3xK/giphy.gif"
            alt="loading.."
          />
        )}
      </div>
      <>
        {hotlist.items &&
          hotlist.items.item.map((ele, index) => {
            return (
              <div key={`${index}${ele.name.value}`}>
                <div key={`${index}${ele.name.value}`}>
                  <img
                    id="img"
                    src={ele.thumbnail.value}
                    alt={ele.name.value}
                    onClick={e => handleClick(e, ele)}
                  />
                  <span>RANK: {ele.rank}</span>
                </div>
                <div>
                  <span id="addtolist" onClick={e => handleClick(e,ele)}>
                    {gameForm ? "close" : " add to list"}
                  </span>
                  <span id="newlist" onClick={e => handleClick(e,ele)}>
                    {newList ? "close" : "new list"}
                  </span>
                </div>
                
                <>
                  {gameForm && focusCurrent.id === ele.id && (
                    <GameForm 
                    formType="ADDGAME" 
                    game={ele} 
                    i={index} 
                    set={setGameForm}
                    gameForm={gameForm}
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
                />
                  )}
                </>
              </div>
            );
          })}
      </>
    </main>
  );
};
export default Hotlist;
