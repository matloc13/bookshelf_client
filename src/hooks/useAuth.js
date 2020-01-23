import { useEffect, useState, useContext } from "react";
import BASE_URL from "./../constants";
import DispatchContext from "../contexts/dispatchContext";


const useAuth = action => {
  const dispatch = useContext(DispatchContext);
  const [loading, setLoading] = useState(false);
  const [welcome, setWelcome] = useState("")


  useEffect(() => {
    const abortController= new AbortController();
    const signal = abortController.signal;

    if (action) {
      switch (action.type) {
        case "CREATE":
          return async function createUser() {
            try {
              setLoading(true);
              const res = await fetch(`${BASE_URL}/users`, {
                signal: signal,
                body: JSON.stringify(action.payload),
                method: "POST",
                headers: {
                  Accept: "application/json, plain/text, */*",
                  "Content-Type": "application/json"
                }
              });
              await new Promise((resolve) =>{
                  if (res) {
                    setLoading(false)
                    return resolve(
                      setWelcome("Please Login to start creating lists.")
                    )
                  }
                
              })
              
              // const user = await res.json();
              // await new Promise(resolve => {
              //   if (user.user) {
              //     console.log(user.user);
            } catch (err) {
              console.error(err);
            } finally {
              setLoading(false);
            }
          };
        case "LOGIN":
          return async function loginUser() {
            try {
              setLoading(true);
              const res = await fetch(`${BASE_URL}/users/login`, {
                signal: signal,
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
                      isAuthenticated: true,
                      token: user.token
                    })
                  );
                }
              });
            } catch (err) {
              console.error(err);
            } finally {
              setLoading(false);
            }
          };
        case "LOGOUT":
          return dispatch({ type: "LOGOUT_USER" });
        default:
          return;
      }
    }
    return () => {
      abortController.abort();
    }
  }, [action, dispatch]);

  return [loading, welcome];
};
export default useAuth;
