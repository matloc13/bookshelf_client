import React from 'react';
const SearchResults = ({array, page}) => {
  console.log(array);
  
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
      </ul>
    </div>
  )
}
export default SearchResults;