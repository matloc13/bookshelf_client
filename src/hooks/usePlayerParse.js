import { useEffect, useState } from 'react';
const response = {playercount: "", best: 0};

const usePlayerParse = (m) => {
  const [topVote, setTopVote] = useState(response);

  const formatData = async(m) => {
    try {
      const top = await new Promise((resolve) => {
        return resolve(findPlayerCount(m.items.item));
      });
      console.log(top);
      if (top.playercount) {
      
      setTopVote({...topVote, playercount: top.playercount, best: top.best})
      }
       
    
    } catch (error) {
      console.error(error);
    } finally {
      // console.log(topVote);
      
    }
  }
useEffect(() => {
  // console.log(m);
  if (m) {
   formatData(m);
  }
// console.log(topVote);
  return () => {
    
  };
}, [m])

const findVotes = (ele, type) => {
  // console.log(ele);
  let numvote;
  
  const vote = ele.result.forEach((item, i) => {
    if (item.value === type) {
      // console.log(item.value);
      // console.log(type);
      // console.log(item.numvotes);
      numvote = item.numvotes;
    }
  });
    // console.log(numvote);
    return numvote;
  }

// find recommended player count
const findPlayerCount = (m) => { 
  // console.log(m);
  
  const find = m.poll[0].results.map((ele) => {
    let playerCount = {}
    if (m) { 
      // console.log(ele);
            playerCount = {num_players: ele.numplayers,
            best: findVotes(ele, "Best"),
            recommended: findVotes(ele, "Recommended"),
            not_recommended: findVotes(ele, "Not Recommended")}
        }
      
       return playerCount;
      })
     
    

return findBest(find);   
}

const findBest = (f) => {
  console.log(f);
  let best = {
    playercount: 0,
    best: 0
  };
  f.forEach((prop) => {
    // console.log(best.best);
    let large = Math.max(prop.best, best.best)
    
    if ( large > best.best ){
       best = {...best, playercount: prop.num_players, best: large}
    }
  })
  console.log(best);
  
return best;
}


  return [ topVote, findPlayerCount];
}
export default usePlayerParse;