import React, {useContext, useState} from 'react';
import DispatchContext from "./../../contexts/dispatchContext";
import Modal from './../modal/Modal';

const SearchResults = ({array, page, status, pl}) => {

  // console.log(array);
const dispatch = useContext(DispatchContext);
const [show, setShow] = useState(false);
const handleClick = (e, ele) => {
  console.log(ele);
  
  dispatch({ type: "SET_CURRENT_GAME", game: ele.id });
  return setShow(!show);
}
console.log(array);


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
                <div className="arrow-container">
                  <span className="arrow-item">
                      <i className="arrow down"></i>
                    </span>
                  <span className="search-arrow-container">{ page > 1 ? i + pl * (page - 1 ) + 1: i +1 }
                  </span>
                 
                </div>               
              </li>
            )})
            : ""
        }
        {
          status &&
          array.length === 0 &&
          <div>No results from this search.</div>
        }
      </ul>
    </div>
  )
}
export default SearchResults;