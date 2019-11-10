import { useState, useContext, useEffect } from "react";
import BASE_URL from "./../constants";
import UserContext from "./../contexts/userContext";
import ListContext from "./../contexts/listContext";
import DispatchContext from "./../contexts/dispatchContext";

const useListGenerator = action => {
  const user = useContext(UserContext);
  const list = useContext(ListContext);
  const dispatch = useContext(DispatchContext);

  const [showForm, setShowForm] = useState(false);
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (action) {
      // console.log(action);

      switch (action.type) {
        case "ADDGAME":
          return async function addGame() {
            setLoading(true);
            try {
              const res = await fetch(
                `${BASE_URL}/users/${user.id}/listanmes/${list.id}/games`,
                {
                  body: JSON.stringify(action.game),
                  method: "POST",
                  headers: {
                    Accept: "application/json, text/plain",
                    "Content-Type": "application/json"
                  }
                }
              );
              const json = await res.json();
              setItem(json);
            } catch (err) {
              console.error(err);
            } finally {
              setShowForm(false);
              setLoading(false);
              dispatch({
                type: "ADD_ITEM",
                listid: list.id
              });
            }
          };
        case "CREATE_LIST":
          return async function listAndGame() {
            setLoading(true);
            try {
              const res = await fetch(
                `${BASE_URL}/users/${user.id}/listanmes/`,
                {
                  body: JSON.stringify({
                    listname: {
                      title: action.title,
                      nu_game: action.game
                    }
                  }),
                  method: "POST",
                  headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                  }
                }
              );
              const json = await res.json();
              setItem(json);
              console.log(item);
            } catch (err) {
              console.error(err);
            } finally {
              dispatch({
                type: "CREATE_LIST",
                title: item.title,
                userId: user.id,
                item: item.nu_game
              });
              setShowForm(false);
              setLoading(false);
            }
          };
        default:
          return;
      }
    }
    return () => {
      console.log("cleanup cleanup everybody do your share");
    };
  }, [action, list, list.id, user.id, dispatch, item]);

  return [showForm, setShowForm, item, loading];
};
export default useListGenerator;
