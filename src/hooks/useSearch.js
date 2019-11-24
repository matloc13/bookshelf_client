import { useState, useEffect, useContext } from 'react';
import  BASE_URL from './../constants';
import DispatchContext from './../contexts/dispatchContext';
// import ListContext from './../contexts/listContext';


const useSearch = (query,paginate) => {
console.log(query);
  const dispatch = useContext(DispatchContext);
  // const allLists = useContext(ListContext);
  const [outputResult, setOutputResult] = useState([])
  const [loading, setLoading] = useState(false);
const [curQuery, setCurQuery] = useState('')
  useEffect(() => {
    const ac = new AbortController();
    const signal = ac.signal;  
    if (query !== '' && query !== curQuery) {
      setOutputResult(...outputResult,[])
      getSearch(query)
        setCurQuery(query);
        
    } else if (query === curQuery && query !== ''){
      getSearch(curQuery)
    }

    return () => {
      ac.abort();
    }
  },[query, paginate]);

  const getSearch = async (query ) => {
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
        search: newArr
      })
        if (json.items.item.length > 50 ) {

          const newArr = []
          switch (paginate) {
            case 1:
           json.items.item.forEach((ele,i) => {
                if (i < 50 ) {
                 newArr.push(ele)
                } else if (i > 49) {
                  return;
                }
              })
              setOutputResult([...outputResult, newArr]);  
              break;
            case 2:
                json.items.item.forEach((ele,i) => {
                  if (i < 100 && i > 50 ) {
                   newArr.push(ele)
                  } else if (i > 99) {
                    return;
                  }
                })
                setOutputResult([...outputResult, newArr]);  
                break;
            case 3:
                json.items.item.forEach((ele,i) => {
                  if (i < 150 && i > 100 ) {
                   newArr.push(ele)
                  } else if (i > 149) {
                    return;
                  }
                })
                setOutputResult([...outputResult, newArr]);  
                break;
            case 4:
                json.items.item.forEach((ele,i) => {
                  if (i < 200 && i > 150 ) {
                   newArr.push(ele)
                  } else if (i > 199) {
                    return;
                  }
                })
                setOutputResult([...outputResult, newArr]);  
                break;
            case 5:
                json.items.item.forEach((ele,i) => {
                  if (i < 250 && i > 199 ) {
                   newArr.push(ele)
                  } else if (i > 249) {
                    return;
                  }
                })
                setOutputResult([...outputResult, newArr]);  
                break;
            default: 
              return;
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