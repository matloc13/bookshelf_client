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
  const [searchPageInfo, setSearchPageInfo] = useState({
    total: 1,
    pages: 1
  })
  const [searchClick, setSearchClick] = useState(false);
  const [loading, outputResult, setOutputResult, setPageLength, pageLength] = useSearch(currentQuery, page);
  // console.log(outputResult);
  // console.log(allLists.search.searchLength);
  useEffect(() => {
    if(values.query) {
      setQuery({...query, query: values.query})
    }
    if(values.pageLength) {
      setPageLength(values.pageLength)
    }
    return () => {
        setQuery('')
    };
  }, [values]); //eslint-disable-line

  // search lenght

  const findRange = () => {
    const lastPage = page * pageLength;
    const firstPage = lastPage - (pageLength-1);
    const range = `${firstPage} of ${lastPage}`;
    return range;
  }

  const numberOfPages = (t) => {
 const pageInfo = {
   total: t,
   pages: () => t/pageLength,
   currentRange: findRange()
 }
    return pageInfo

 
  }
  useEffect(() => {
   
   if (searchList.searchLength ) {
    const total = searchList.searchLength;
    setSearchPageInfo(numberOfPages(total))
   }


  }, [searchList.searchLength, page ]); //eslint-disable-line

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
          <fieldset className="advanced-search-box">
          <select name="pageLength" id="pageLength" value={pageLength.pageLength} onChange={handleInput}>
         
            {
              [15, 25, 35, 50, ].map(pl =>(
                <>
                {
                  pl === 25 ?
                  <option value={pl} selected>{pl}</option>
                  :
                  <option value={pl}>{pl}</option>
                }
               </>
              ))
            }
          </select>
          </fieldset>
      </form>
      { 
      searchList &&
      searchList.searchLength > pageLength &&
        <SearchPagination 
          setPG={searchPageInfo}
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
      searchList.searchLength > pageLength &&
        <SearchPagination 
          setPG={searchPageInfo}
          pagination={pagination}
          page={page}
        />
      }
      
    </div>
  )
}
export default Search;  