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
  const [searchTotal, setSearchTotal] = useState(null);
  const [searchPageInfo, setSearchPageInfo] = useState({
    total: null,
    pages: null,
    currentRange: null,
  })
  const [searchClick, setSearchClick] = useState(false);
  const [loading, outputResult, setOutputResult, setPageLength, pageLength] = useSearch(currentQuery, page);

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

  
  const findRange = (st, pl, p) => {
    // console.log(pageLength)
    const lastPage = p * pl;
    const firstPage = lastPage - (pl - 1 );
      if (lastPage > st) {
        return `${firstPage} of ${st}`
      } else {
          return `${firstPage} of ${lastPage}`;
      }      
  }

   const findPages = (st, pl) => {
    // console.log(st)
    const totalPages = ( st/pl);
    return totalPages
  }

  useEffect(() => {
    if (searchList) {
      if (searchList.searchLength) {
        const catchTotal = searchList.searchLength;
        setSearchTotal(catchTotal);
      }
    }   
  }, [!loading, searchList]); //eslint-disable-line

  useEffect(() => {
   
    setSearchPageInfo({...searchPageInfo,  
      total: searchTotal,
      pages: findPages(searchTotal, pageLength),
      currentRange: findRange(searchTotal, pageLength, page)
    });
   
  }, [searchTotal, page, pageLength])

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
  e.preventDefault();
  switch (e.target.id) {
    case "prev":
      return setPage(page - 1);    
    case "next":
      return setPage(page + 1);
    case "clear":
      setQuery({query: " "})
      setSearchClick(!searchClick);
      return setOutputResult([]);
    default:
      return;
  }
}
  return (
    <main className="search-container">
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
            <label htmlFor="pageLength"> results per page
          <select name="pageLength" id="pageLength" value={pageLength} onChange={handleInput}>
         
            {
              [15, 25, 35, 50 ].map((pl, i )=>(
                <> 
                  <option key={i} value={pl}>{pl}</option>
               </>
              ))
            }
          </select>
            </label>
          </fieldset>
          <button id="clear" onClick={pagination}>clear</button>
      </form>
      { 
      searchTotal &&
      searchTotal > pageLength &&
        <SearchPagination 
          setPG={searchPageInfo}
          pagination={pagination}
          page={page}
          show={false}
        />
      }
 
      {
        loading ? 
        <aside className="loading-div">
            
          <img
            src="https://media.giphy.com/media/5KX9jiNXkb3xK/giphy.gif"
            alt="loading.."
          />
     
        </aside>
        : 

          <SearchResults 
            pl={pageLength}
            array={outputResult}
            page={page}
            status={searchClick}
  
          />
      }

{ 
      searchTotal &&
      searchTotal > pageLength &&
        <SearchPagination 
          setPG={searchPageInfo}
          pagination={pagination}
          page={page}
          show={true}
        />
      }
      
    </main>
  )
}
export default Search;  