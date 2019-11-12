import { useEffect, useState, useContext } from "react";
import BASE_URL from "./../constants";
import DispatchContext from "../contexts/dispatchContext";
import { reject } from "q";

const useAuth = action => {
  const dispatch = useContext(DispatchContext);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  // const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (action) {
      switch (action.type) {
        case "CREATE":
          return async function createUser() {
            try {
              setLoading(true);
              const res = await fetch(`${BASE_URL}/users`, {
                body: JSON.stringify(action.payload),
                method: "POST",
                headers: {
                  Accept: "application/json, plain/text, */*",
                  "Content-Type": "application/json"
                }
              });
              const user = await res.json();
              await new Promise(resolve => {
                if (user.user) {
                  return resolve(
                    dispatch({
                      type: "SET_USER",
                      id: user.user.id,
                      username: user.user.username,
                      token: user.token
                    })
                  );
                }
              });
            } catch (err) {
              console.error(err);
            } finally {
              setisAuthenticated(true);
              setLoading(false);
            }
          };
        case "LOGIN":
          return async function loginUser() {
            try {
              setLoading(true);
              const res = await fetch(`${BASE_URL}/users/login`, {
                body: JSON.stringify(action.payload),
                method: "POST",
                headers: {
                  Accept: "application/json, plain/text, */*",
                  "Content-Type": "application/json"
                }
              });
              const user = await res.json();

              await new Promise(resolve => {
                if (user.user) {
                  return resolve(
                    dispatch({
                      type: "SET_USER",
                      id: user.user.id,
                      username: user.user.username,
                      token: user.token
                    })
                  );
                }
              });
            } catch (err) {
              console.error(err);
            } finally {
              setisAuthenticated(true);
              setLoading(false);
            }
          };
        default:
          return;
      }
    }
  }, [action]);

  return [loading, isAuthenticated];
};
export default useAuth;
