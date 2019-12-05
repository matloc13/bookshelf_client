import React, {useContext, useState} from 'react';
import DispatchContext from "./../../contexts/dispatchContext";
import Modal from './../modal/Modal';
import GameForm from './../form/GameForm';
import NewListForm from './../form/NewListForm';

const SearchResults = ({array, page, status, pl}) => {
  // console.log(array);
const dispatch = useContext(DispatchContext);
const [show, setShow] = useState(false);
const [seeForms, setSeeForms] = useState(true);
const handleClick = (e, ele) => {
  e.preventDefault();
  console.log(ele);
  dispatch({ type: "SET_CURRENT_GAME", game: ele.id });
  return setShow(!show);
}
console.log(array);

const toggle = (e) => {
  e.preventDefault();
  switch(e.target.id) {
    case "showLogo": 
      return setSeeForms(!seeForms);
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

                <span 
                  className="title-container"
                  onClick={(e) => handleClick(e,ele)}>
                    
                  <span className="title">{ele.name.value}</span> 
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
                </span>
                <b></b>
                {
                  seeForms ? 
                  <div 
                  id="showLogo"
                  className="arrow-container" 
                  onClick={toggle}>
                    <span className="arrow-item">
                        <i className="arrow down"></i>
                      </span>
                    <span className="search-arrow-container">{ page > 1 ? i + pl * (page - 1 ) + 1: i +1 }
                    </span>
                   
                  </div>   :
                  <div className="forms">
                    <GameForm
                      game={ele}
                      i={i}
                      set={toggle}
                      page="search"
                    /> 
                    <NewListForm 
                      game={ele}
                      i={i}
                      set={toggle}
                      page="search"
                    />
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