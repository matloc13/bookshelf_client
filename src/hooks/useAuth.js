import { useEffect, useState, useContext } from "react";
import BASE_URL from "./../constants";
import DispatchContext from "../contexts/dispatchContext";
import { reject } from "q";

const useAuth = action => {
  const dispatch = useContext(DispatchContext);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (action) {
      switch (action.type) {
        case "CREATE":
          return async function createUser() {
            try {
              setLoading(true);
              await fetch(`${BASE_URL}/users`, {
                body: JSON.stringify(action.payload),
                method: "POST",
                headers: {
                  Accept: "application/json, plain/text, */*",
                  "Content-Type": "application/json"
                }
              })
                .then(res => res.json())
                // .then(json => console.log(json.user))
                .then(json => setUser(json))
                .then(console.log(user))
                .then(setisAuthenticated(true))
                .catch(err => console.error(err));
            } catch (err) {
              console.error(err);
            } finally {
              if (user.user) {
                dispatch({
                  type: "SET_USER",
                  id: user.user.id,
                  username: user.user.username,
                  token: user.token,
                  isAuthenticated
                });
              }
              setLoading(false);
            }
          };
        case "LOGIN":
          // return async function loginUser() {
          //   try {
          //     setLoading(true);
          //     const res = await fetch(`${BASE_URL}/users/login`, {
          //       body: JSON.stringify(action.payload),
          //       method: "POST",
          //       headers: {
          //         Accept: "application/json, plain/text, */*",
          //         "Content-Type": "application/json"
          //       }
          //     });
          //     const json = await res.json();

          //     await new Promise(resolve => {
          //       return resolve(setUser(json));
          //     })
          //       .then(setisAuthenticated(true))
          //       .catch(err => console.error(err))
          //       .finally(console.log(user));
          //   } catch (err) {
          //     console.error(err);
          //   } finally {
          //     if (user.user) {
          //       dispatch({
          //         type: "SET_USER",
          //         id: user.user.id,
          //         username: user.user.username,
          //         token: user.token,
          //         isAuthenticated
          //       });
          //     }
          //     setLoading(false);
          //   }
          // };
          return new Promise(resolve => {
            const loginUser = async () => {
              try {
                const res = await fetch(`${BASE_URL}/users/login`, {
                  body: JSON.stringify(action.payload),
                  method: "POST",
                  headers: {
                    Accept: "application/json, plain/text, */*",
                    "Content-Type": "application/json"
                  }
                });
                const json = await res.json();
                await new Promise(resolve => {
                  return resolve(setUser(json));
                })
                  .then(setisAuthenticated(true))
                  .catch(err => console.log(err))
                  .finally(console.log(user));
              } catch (err) {
                console.error(err);
              }
            };
            if (!user.user) {
              return reject(console.error("err"));
            }

            return resolve(
              dispatch({
                type: "SET_USER",
                id: user.user.id,
                username: user.user.username,
                token: user.token,
                isAuthenticated
              })
            );
          });

        default:
          return;
      }
    }
  }, [action]);

  return [loading];
};
export default useAuth;
