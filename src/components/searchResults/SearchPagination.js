import React from 'react';


const SearchPagination = ({pagination, page, setPG, show}) => {
  // console.log(setPG.pages);
  // console.log(page);
  
  
  return (
    <div className="pagination">

      <button 
       id="prev" 
        className="button"
        onClick={pagination} 
        disabled={page === 1 ? true: false}>previous
      </button>
      <span id="current">
        <span className="small"> {page} </span>.. 
        <span className="current"> {Math.ceil(setPG.pages)}</span>
      </span>
      <button 
        id="next" 
        className="button"
        onClick={pagination} 
        disabled={page >=  setPG.pages  ? true : false}
      >next</button>
    
  {  show &&
    <div className="pageInfo">
      <span className="current">{`results ${setPG.currentRange} of ${setPG.total}`}
      </span>
    </div>
    }
  </div>
  )
}
export default SearchPagination;