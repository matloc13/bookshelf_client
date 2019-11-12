import { useState, useContext, useEffect } from "react";
import BASE_URL from "./../constants";
import UserContext from "./../contexts/userContext";
import ListContext from "./../contexts/listContext";
import DispatchContext from "./../contexts/dispatchContext";

const useListGenerator = action => {
  const user = useContext(UserContext);
  const list = useContext(ListContext);
  const dispatch = useContext(DispatchContext);
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (action.payload) {
      console.log(action.payload.title);

      switch (action.type) {
        case "ADDGAME":
          return addGame(action.payload.game, user.id, action.payload.list_id);
        case "CREATE_LIST":
          return listAndGame(
            action.payload.game,
            user.id,
            action.payload.title
          );
        default:
          return;
      }
    }
  }, [action]);

  const listAndGame = (game, uid, title) => {
    setLoading(true);
    fetch(`${BASE_URL}/users/${uid}/listnames`, {
      method: "POST",
      body: JSON.stringify({
        listname: {
          title: title,
          nu_game: game
        }
      }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => setItem(json))
      .then(setLoading(false))
      .catch(err => console.error(err))
      .finally(
        item &&
          dispatch({
            type: "CREATE_LIST",
            title: item.title,
            id: item.id,
            userId: item.user_id
          })
      );
  };

  const addGame = (game, uid, lid) => {
    setLoading(true);
    fetch(`${BASE_URL}/users/${uid}/listnames/${lid}/games`, {
      method: "POST",
      body: JSON.stringify(game),
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => setItem(json))
      .then(setLoading(false))
      .catch(err => console.error(err))
      .finally(
        dispatch({
          type: "ADD_ITEM",
          listid: list.id
        })
      );
  };

  return [loading];
};
export default useListGenerator;
