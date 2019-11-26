import React from 'react';
const SearchResults = ({array, page, status, pl}) => {
  // console.log(array);
  return (
    <div className="search-results-container">
      <ul>
        {
          array[page - 1] ?
          array[page - 1].map((ele, i) => {
            return (
              <li key={`${ele.id}n${i}`} className="search-result-item">
                <span>#{ page > 1 ? i + pl * (page - 1 ) + 1: i +1 }</span>
                <span>{ele.name.value}</span>
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