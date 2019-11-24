import React from 'react';
const SearchResults = ({array, page, status}) => {
  // console.log(array);
  return (
    <div>
      <ul>
        {
          array[page - 1] ?
          array[page - 1].map((ele, i) => {
            return (
              <li key={i}>{ele.name.value}</li>
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