import { useState, useContext } from "react";
import BASE_URL from "./../constants";
import ListContext from "./../contexts/listContext";
import UserContext from "./../contexts/userContext";

const useManageItem = () => {
  const allLists = useContext(ListContext);
  const user = useContext(UserContext);
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(false);

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
      const res = await fetch(
        `${BASE_URL}/users/$${user.id}/listnames/${deleted.listid}/games/${deleted.gameid}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json, text/plain",
            "Content-Type": "application/json"
          }
        }
      );
      // const gameItem = res.filter
    } catch (err) {
      console.error(err);
    }
  };
  return [game, loading, getItem, deleteItem];
};
export default useManageItem;
