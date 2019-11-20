import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import BASE_URL from "./../constants";
import ListContext from "./../contexts/listContext";
import UserContext from "./../contexts/userContext";

const useManageItem = del => {
  const allLists = useContext(ListContext);
  const user = useContext(UserContext);
  const [game, setGame] = useState(null);
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (del) {
      deleteItem();
    }

    return () => {
      console.log("deleting");
    };
  }, [del]);

  const notify = item => {
    toast(`${item}`);
  };

  const getItem = async () => {
    try {
      setLoading(true);
      const gameid = await allLists.current.gameid;
      const res = await fetch(`${BASE_URL}/bgg_lists/${gameid}`);
      const getgame = await res.json();
      await new Promise(resolve => {
        return resolve(setGame(getgame));
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
        // Notify goes here
        // const gameItem = res.filter
      }
    } catch (err) {
      console.error(err);
    }
  };

  return [game, loading, getItem, deleteItem, response];
};
export default useManageItem;
