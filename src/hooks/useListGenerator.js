import { useState, useContext, useEffect } from "react";
import BASE_URL from "./../constants";
import UserContext from "./../contexts/userContext";
// import ListContext from "./../contexts/listContext";
import DispatchContext from "./../contexts/dispatchContext";

const useListGenerator = action => {
  const user = useContext(UserContext);
  // const list = useContext(ListContext);
  const dispatch = useContext(DispatchContext);
  // const [item, setItem] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (action.payload) {
      // console.log(action.payload.title);

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
        case "GET_LIST":
          return async function getLists() {
            setLoading(true);
            try {
              const res = await fetch(`${BASE_URL}/users/${user.id}/listnames`);
              const listJSON = await res.json();
              await new Promise(resolve => {
                console.log(listJSON);

                return resolve(
                  dispatch({
                    type: "SET_LIST",
                    lists: listJSON
                  })
                );
              });
            } catch (err) {
              console.error(err);
            } finally {
              setLoading(false);
            }
          };
        // case "UPDATE_LIST":
        //   return async function updateList() {
        //     const res = await fetch(
        //       `${BASE_URL}/users/${user.id}/listnames/${lid}`,
        //       {
        //         method: "PUT",
        //         body: JSON.stringify(action.payload),
        //         headers: {
        //           Accept: "application/json, text/plain",
        //           "Content-type": "application/json"
        //         }
        //       }
        //     );
        //     const updateJSON = await res.json();
        //   };

        default:
          return;
      }
    }
  }, [action]);

  return [loading];
};
export default useListGenerator;
