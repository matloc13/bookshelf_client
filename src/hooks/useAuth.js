import { useEffect, useState, useContext } from "react";
import BASE_URL from "./../constants";
import DispatchContext from "../contexts/dispatchContext";

const useAuth = action => {
  const dispatchUser = useContext(DispatchContext);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (action) {
      switch (action.type) {
        case "CREATE":
          return async function createUser() {
            try {
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
                dispatchUser({
                  type: "SET_USER",
                  id: user.user.id,
                  username: user.user.username,
                  token: user.token,
                  isAuthenticated
                });
              }
            }
          };
        case "LOGIN":
          return async function loginUser() {
            try {
              await fetch(`${BASE_URL}/users/login`, {
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
                dispatchUser({
                  type: "SET_USER",
                  id: user.user.id,
                  username: user.user.username,
                  token: user.token,
                  isAuthenticated
                });
              }
            }
          };
        default:
          return;
      }
    }
    return () => {
      console.log("cleanup");
    };
  }, [action]);

  return [user, isAuthenticated];
};
export default useAuth;
