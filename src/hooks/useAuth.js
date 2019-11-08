import { useEffect, useState } from "react";
import BASE_URL from "./../constants";
const useAuth = (fi, action) => {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  useEffect(() => {
    switch (action.type) {
      case "CREATE":
        createUser(fi);
        break;
      case "LOGIN":
        loginUser(fi);
        break;
      default:
        throw new Error("Could not login");
    }
    return () => {
      setisAuthenticated(false);
    };
  }, [action]);

  const createUser = (event, fi) => {
    fetch(`${BASE_URL}/users`, {
      body: JSON.stringify(fi),
      method: "POST",
      headers: {
        Accept: "application/json, plain/text, */*",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      // .then(json => console.log(json.user))
      .then(json => setUser(json.user))
      // .then(setSignin(!signin))
      .catch(err => console.error(err))
      .finally(setisAuthenticated(true));
  };

  const loginUser = (event, fi) => {
    console.log(fi);
    fetch(`${BASE_URL}/users/login`, {
      body: JSON.stringify(fi),
      method: "POST",
      headers: {
        Accept: "application/json, plain/text, */*",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => setUser(json))
      .catch(err => console.error(err))
      .finally(setisAuthenticated(true));
  };

  return [user, isAuthenticated];
};
export default useAuth;
