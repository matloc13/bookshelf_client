import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import BASE_URL from "./../constants";
import ListContext from "./../contexts/listContext";
import UserContext from "./../contexts/userContext";
// import DispatchContext from './../contexts/dispatchContext';
import usePlayerParse from "./../hooks/usePlayerParse";
const useManageItem = del => {
  const allLists = useContext(ListContext);
  const user = useContext(UserContext);
  // const dispatch = useContext(DispatchContext);
  const [game, setGame] = useState(null);
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [topPlayerCount, setTopPlayerCount] = useState({})
  const [topVote] = usePlayerParse(game);

  useEffect(() => {
    if (del) {
      deleteItem();
    }
    return () => {
      console.log("deleting");
    };
  }, [del]); //eslint-disable-line

  useEffect(() => {
    setTopPlayerCount({...topPlayerCount, playercount: topVote.playercount, best: topVote.best})
    return () => {};
  }, [topVote]) //eslint-disable-line

  const notify = item => {
    toast(`${item}`);
  };

  const getItem = async () => {
    // console.log(allLists.curent);
    try {
      setLoading(true);
      const gameid = await allLists.current.gameid;
      console.log(gameid);
      const res = await fetch(`${BASE_URL}/bgg_lists/${gameid}`);
      const getgame = await res.json();
      await new Promise((resolve) => {
        // console.log(getgame);      
        if (getgame.items.item.name) {
          return resolve(setGame(getgame))
        } 
      });
    } catch (err) {
      console.error(err);
    } finally {   
      setLoading(false);
      // console.log(allLists.curent);
      
      
    }
  };

  const deleteItem = async () => {
    try {
      const deleted = await allLists.current;
      if (deleted) {
        console.log(deleted);

        const res = await fetch(
          `${BASE_URL}/users/${user.id}/listnames/${deleted.listid}/games/${deleted.gameuserid}`,
          {
            method: "DELETE",
            headers: {
              Accept: "application/json, text/plain",
              "Content-Type": "application/json"
            }
          }
        );
        await new Promise(resolve => {
          return resolve(setResponse(res));
        });
        notify(`Item deleted`)
      }
    } catch (err) {
      console.error(err);
    }
  };

  return [game, loading, getItem, deleteItem, response, topPlayerCount];
};
export default useManageItem;
