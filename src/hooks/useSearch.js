import { useState, useEffect, useContext } from 'react';
import  BASE_URL from './../constants';
import DispatchContext from './../contexts/dispatchContext';
import ListContext from './../contexts/listContext';


const useSearch = (query,paginate) => {
console.log(query);
  const dispatch = useContext(DispatchContext);
  const allLists = useContext(ListContext);
  const LENGTH = allLists.search.searchLength;
  const [outputResult, setOutputResult] = useState([])
  const [loading, setLoading] = useState(false);
const [curQuery, setCurQuery] = useState('');

  useEffect(() => {
    const ac = new AbortController();
    const signal = ac.signal;  
    if (query !== '' && query !== curQuery) {
      // setOutputResult(...outputResult,[])
      getSearch(query)
        setCurQuery(query);
        
    } else if (query === curQuery && query !== ''){
      getSearch(curQuery)
    }

    return () => {
      ac.abort();
    }
  },[query, paginate]);
// current position
  const currentPosition = (pagelength,page) => {
    const c = pagelength * page;
    console.log( c);
    
    return c;
  }

  const getSearch = async (query ) => {
    const pageLength = 25;
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/searchlists/${query}`);
      const json = await res.json();
   
     if (json.items.item) {
      const newArr = json.items.item.filter(ele => ele.type !== 'videogame');
     await new Promise((resolve) => {
      //  console.log(currentResult);
  
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
  // const handleSearch = () => {}
  
  return [loading, outputResult, setOutputResult]
}
export default useSearch;