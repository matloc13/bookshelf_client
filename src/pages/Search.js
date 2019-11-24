import React, {useState, useEffect, useContext} from 'react';
import ListContext from './../contexts/listContext';
import useInput from './../hooks/useInput';
import useSearch from './../hooks/useSearch';
import Input from './../components/form/inputs/Input';
import SearchResults from './../components/SearchResults';
const Search = () => {
  const allLists = useContext(ListContext);
  const [ handleInput, values] = useInput();
  const [query, setQuery] = useState({query: ''});
  const [currentQuery, setcurrentQuery] = useState()
  const [page, setPage] = useState(1);
  const [loading, outputResult, setOutputResult] = useSearch(currentQuery, page);
  console.log(outputResult);
  console.log(allLists.search);
  

  useEffect(() => {
    if(values.query) {
      setQuery({...query, query: values.query})
    }
  
    return () => {
      setQuery('')
    };
  }, [values])
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(query.query);
    setOutputResult([])
    
    if (query.query) {
      return setcurrentQuery(query.query)
    }
   
  }
const pagination = (e)=> {
  switch (e.target.id) {
    case "prev":
      return setPage(page - 1);    
    case "next":
      return setPage(page + 1);
    default:
      return;
  }
}

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label htmlFor="query">
          <Input
            type="text"
            id="search"
            name="query"
            required
            handleInput={handleInput}
            value={query.query}
             />
        </label>
          <label htmlFor="submit">
            <Input 
              type="submit"
              id="submitSearch"
              name="Search"
            />
          </label>
      </form>
      { 
      allLists.search.searchResults.length > 50 &&
     <div className="pagination">
        <h3>Results</h3>
        <button id="prev" onClick={pagination} disabled={page === 1 ? true: false}>previous</button>
        <span id="current"> .. {page} .. </span>
        <button id="next" onClick={pagination}>next</button>
      </div>
      }
 
      {
        loading ? 
        <div>getting results</div>
        : 
        <SearchResults 
          array={outputResult}
          page={page}
        />
      }
      
    </div>
  )
}
export default Search;  