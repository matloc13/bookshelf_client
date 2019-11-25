import React, {useState, useEffect, useContext} from 'react';
import ListContext from './../contexts/listContext';
import useInput from './../hooks/useInput';
import useSearch from './../hooks/useSearch';
import Input from './../components/form/inputs/Input';
import SearchResults from '../components/searchResults/SearchResults';
import SearchPagination from '../components/searchResults/SearchPagination';

const Search = () => {
  const allLists = useContext(ListContext);
  const searchList = allLists.search;
  const [ handleInput, values] = useInput();
  const [query, setQuery] = useState({query: ''});
  const [currentQuery, setcurrentQuery] = useState()
  const [page, setPage] = useState(1);
  const [searchClick, setSearchClick] = useState(false);
  const [loading, outputResult, setOutputResult] = useSearch(currentQuery, page);
  // console.log(outputResult);
  // console.log(allLists.search.searchLength);
  
  useEffect(() => {
    if(values.query) {
      setQuery({...query, query: values.query})
    }
    return () => {
        setQuery('')
    };
  }, [values]); //eslint-disable-line

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchClick(true);
    setPage(1);
    setOutputResult([]);
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
    <div className="search-container">
      <form onSubmit={handleSearch} className="form-style search">
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
      searchList &&
      searchList.searchLength > 50 &&
        <SearchPagination 
          pagination={pagination}
          page={page}
        />
      }
 
      {
        loading ? 
        <div>getting results</div>
        : 

          <SearchResults 
            array={outputResult}
            page={page}
            status={searchClick}
          />

      }

{ 
      searchList &&
      searchList.searchLength > 50 &&
        <SearchPagination 
          pagination={pagination}
          page={page}
        />
      }
      
    </div>
  )
}
export default Search;  