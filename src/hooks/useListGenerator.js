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
        case "ADD_GAME":
          return async function addGame() {
            try {
              setLoading(true);
              const res = await fetch(
                `${BASE_URL}/users/${user.id}/listnames/${action.payload.id}/games`,
                {
                  method: "POST",
                  body: JSON.stringify(action.payload),
                  headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                  }
                }
              );

              const game = res.json();

              await new Promise(resolve => {
                return resolve(
                  dispatch({
                    type: "ADD_ITEM",
                    name: game.name.value
                  })
                );
              });
            } catch (err) {
              console.error(err);
            } finally {
              setLoading(false);
            }
          };
        case "CREATE_LIST":
          return async function listAndGame() {
            try {
              setLoading(true);
              const res = await fetch(
                `${BASE_URL}/users/${user.id}/listnames`,
                {
                  method: "POST",
                  body: JSON.stringify({
                    listname: {
                      title: action.payload.title,
                      nu_game: action.payload.game
                    }
                  }),
                  headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-type": "application/json"
                  }
                }
              );
              const title = await res.json();

              await new Promise(resolve => {
                console.log(title);

                return resolve(
                  dispatch({
                    type: "CREATE_LIST",
                    id: title.id,
                    userId: title.user_id,
                    title: title.title
                  })
                );
              });
            } catch (err) {
              console.error(err);
            } finally {
              setLoading(false);
            }
          };
        default:
          return;
      }
    }
  }, [action]);

  // const listAndGame = (game, uid, title) => {
  //   fetch(`${BASE_URL}/users/${uid}/listnames`, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       listname: {
  //         title: title,
  //         nu_game: game
  //       }
  //     }),
  //     headers: {
  //       Accept: "application/json, text/plain, */*",
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(json => setItem(json))
  //     .then(setLoading(false))
  //     .catch(err => console.error(err))
  //     .finally(
  //       item &&
  //         dispatch({
  //           type: "CREATE_LIST",
  //           title: item.title,
  //           id: item.id,
  //           userId: item.user_id
  //         })
  //     );
  // };

  const addGame = (game, uid, lid) => {
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
