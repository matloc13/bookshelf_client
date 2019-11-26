import React from 'react';


const SearchPagination = ({pagination, page, setPG, pl}) => {
  console.log(setPG.pages);
  console.log(page);
  
  
  return (
    <div className="pagination">

    <button 
    id="prev" 
    className="button"
    onClick={pagination} 
    disabled={page === 1 ? true: false}>previous
    </button>
    <span id="current"> .. {page} .. </span>
    <button 
      id="next" 
      className="button"
      onClick={pagination} 
      //still not showing remainder
      disabled={page >=  setPG.pages  ? true : false}
    >next</button>
    
    <h5>{`results ${setPG.currentRange} of ${setPG.total}`}</h5>
  </div>
  )
}
export default SearchPagination;