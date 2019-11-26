import { useState, useEffect, useContext } from 'react';
import  BASE_URL from './../constants';
import DispatchContext from './../contexts/dispatchContext';


const useSearch = (query,paginate ) => {
  // console.log(query);
  const dispatch = useContext(DispatchContext);
  const [outputResult, setOutputResult] = useState([])
  const [loading, setLoading] = useState(false);
  const [curQuery, setCurQuery] = useState('');
  const [pageLength, setPageLength] = useState(25)

  useEffect(() => {
    const ac = new AbortController();
    if (query !== '' && query !== curQuery) {
      getSearch(query, pageLength)
        setCurQuery(query);
        
    } else if (query === curQuery && query !== ''){
      getSearch(curQuery, pageLength)
    }

    return () => {
      ac.abort();
    }
  },[query, paginate]);//eslint-disable-line

// current position of pagination

  const currentPosition = (pagelength,page) => {
    const c = pagelength * page;
    // console.log( c);
    return c;
  }


  const getSearch = async (query,pageLength ) => {
    // const pageLength = 25;
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/searchlists/${query}`);
      const json = await res.json();
   
     if (json.items.item) {
      const newArr = json.items.item.filter(ele => ele.type !== 'videogame');
     await new Promise((resolve) => {
  
      dispatch({
        type: 'CURRENT_SEARCH',
        search: newArr,
        length: newArr.length
      })
        if (json.items.item.length > pageLength ) {

          const newArray = []
          let cp = currentPosition(pageLength, paginate)

            if (paginate === 1) {
              json.items.item.forEach((ele,i) => {
                if (i <= cp - 1 ) {
                newArray.push(ele)
            } else if (i >= cp) {
              return;
            }
              })     
              setOutputResult([...outputResult, newArray]);  
            } else {                
                json.items.item.forEach((ele,i) => {            
                  if (i < cp && i >= cp - pageLength ) {
                  newArray.push(ele)
                  } else if (i >= cp ) {
                    return;
                    }
                 })
              setOutputResult([...outputResult, newArray]);  
            } 

         }  else {
          setOutputResult([...outputResult, json.items.item])   
         }
       return resolve(outputResult)
     })  }   

    } catch (error) {
      console.error(error);
      
    }finally {
      // console.log(allLists.search);      
      setLoading(false)
    }
  }
  
  return [loading, outputResult, setOutputResult, setPageLength, pageLength]
}
export default useSearch;