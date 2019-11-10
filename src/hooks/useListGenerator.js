import { useState, useContext, useEffect } from "react";
import BASE_URL from "./../constants";
import UserContext from "./../contexts/userContext";
import ListContext from "./../contexts/listContext";

const useListGenerator = action => {
  const user = useContext(UserContext);
  const list = useContext(ListContext);

  const [showForm, setShowForm] = useState(false);
  const [itemRes, setItemRes] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (action) {
      switch (action.type) {
        case "ADDGAME":
          return addGame(action.game, list.id);
        case "NEWLIST":
          return listAndGame(action.game, action.title);
        default:
          return;
      }
    }
    return () => {
      console.log("cleanup cleanup everybody do your share");
    };
  }, [action]);

  const addGame = async (game, lid) => {
    try {
      const res = await fetch(
        `${BASE_URL}/users/${user.id}/listanmes/${lid}/games`,
        {
          body: JSON.stringify(game),
          method: "POST",
          headers: {
            Accept: "application/json, text/plain",
            "Content-Type": "application/json"
          }
        }
      );
      const json = await res.json();
      setItemRes(json);
    } catch (err) {
      console.error(err);
    } finally {
      setShowForm(false);
      setLoading(false);
    }
  };

  const listAndGame = async (game, title) => {
    try {
      const res = await fetch(`${BASE_URL}/users/${user.id}/listanmes/`, {
        body: JSON.stringify({
          listname: {
            title: title,
            nu_game: game
          }
        }),
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      });
      const json = await res.json();
      setItemRes(json);
    } catch (err) {
      console.error(err);
    } finally {
      setShowForm(false);
      setLoading(false);
    }
  };
  return [showForm, itemRes, loading];
};
export default useListGenerator;
