import React from 'react';
const SearchResults = ({array, page, status}) => {
  // console.log(array);
  return (
    <div className="search-results-container">
      <ul>
        {
          array[page - 1] ?
          array[page - 1].map((ele, i) => {
            return (
              <li key={`${ele.id}n${i}`} className="search-result-item">
                {ele.name.value}
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