import React, {useContext, useState, useEffect} from 'react';
import UserContext from './../../contexts/userContext';
import DispatchContext from "./../../contexts/dispatchContext";
import ListContext from './../../contexts/listContext';
import Modal from './../modal/Modal';
import GameForm from './../form/GameForm';
import NewListForm from './../form/NewListForm';
import useManageItem from './../../hooks/useManageItem';
import { toast } from 'react-toastify';


const SearchResults = ({array, page, status, pl}) => {
  // console.log(array);
const user = useContext(UserContext);
const dispatch = useContext(DispatchContext);
const allLists = useContext(ListContext);
const [gameStatus, setGameStatus] = useState(false);
const [show, setShow] = useState(false);
const [seeForms, setSeeForms] = useState(true);
const [game, load, getItem] = useManageItem();
const notify = (item) => {
  toast(item)
}
// console.log(array);

useEffect(() => {
  setGameStatus(!gameStatus)
  console.log(game);
  
  return () => {
    
  };
}, [game])
useEffect(() => {
  if (allLists.current) {
    console.log(allLists.current.id);
  }
  return () => {};
}, [allLists.current, allLists])

const toggle = (e, ele, type) => {
  e.persist();
  // console.log(seeForms);
  console.log(ele);
  
  switch(type) {
    case "showLogo": 
    dispatch({ type: "SET_CURRENT_GAME", game: ele.id });
      const thisGame = async () => {
        try {
          if (user.isAuthenticated) {
            console.log('user present');
            
            if (allLists.current) {
              console.log('grabbing data');
             getItem();
              await new Promise((resolve) => {
                return resolve(setSeeForms(!seeForms))
            })
            }
          } else {
            notify('Please Login')
          }
        } catch (error) {
            console.error(error);          
        } finally {
            // console.log(thisItem);
            
        }
      }
      return thisGame();
    case "showModal" :
      dispatch({ type: "SET_CURRENT_GAME", game: ele.id });
        return setShow(!show);        
    default:
      return;
  }
}
  return (
    <div className="search-results-container">
          {show && <Modal setShow={setShow} show={show}/>}
      <ul>
        {
          array[page - 1] ?
          array[page - 1].map((ele, i) => {
            return (
              <li key={`${ele.id}n${i}`} className="search-result-item">

                <div
                  className="title-container"
                  onClick={(e) => toggle(e,ele, "showModal")}>
                    
                  <span 
                  className="title"
                  id={`showModal`}>
                    {ele.name.value}</span> 
                    <b></b>
                    {
                      ele.yearpublished &&
                      <span className="year"> 
                        <span className="property-text"> year: </span>{ele.yearpublished.value}</span>
                    } 
                    <b></b>                
                    <span className="id">
                      <span className="property-text">bggid: </span> {ele.id}
                    </span>                  
                </div>
                <b></b>
                {
                  seeForms ? 
                  <div 
                    className="arrow-container" 
                    onClick={(e) => toggle(e, ele, "showLogo")}>
                    <span className="arrow-item">
                        <i className="arrow down"></i>
                      </span>
                    <span className="search-arrow-container">{ page > 1 ? i + pl * (page - 1 ) + 1: i +1 }
                    </span>
                   
                  </div>   :
                  <div className="forms-box">                    
                    {
                    game && 
                    ele.id === game.items.item.id ?
                      <div className="forms">
                        <span onClick={() => setSeeForms(true)}>X</span>
                          <GameForm
                            game={game.items.item}
                            i={i}
                            set={toggle}
                            page="search"
                          /> 
                          <b></b>
                          <NewListForm 
                            game={game.items.item}
                            i={i}
                            set={toggle}
                            page="search"
                          />
                      </div>
                    : ''
                    }                              
                  </div>
                
                }
                            
              </li>
            )})
            : ""
        }
        {
          status &&
          array.length === 0 &&
          <li><span className="year">No results from this search.</span></li>
        }
      </ul>
    </div>
  )
}
export default SearchResults;