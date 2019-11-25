import React, {useContext} from 'react';
import ListContext from './../../contexts/userContext';

const SearchPagination = ({pagination, page,}) => {
  const allLists = useContext(ListContext);
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
      disabled={(page * 25) > allLists.search && allLists.search.searchLength ? true :false}
    >next</button>
  </div>
  )
}
export default SearchPagination;