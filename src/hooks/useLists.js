import { useEffect, useContext, useState } from "react";
import UserContext from "./../contexts/userContext";

// create function called manage lists,
// this will be a switch to trigger all of the rest calls to ROR backend

const useLists = () => {
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    getLists();
    return () => {
      setLists([]);
    };
  }, []);
  const getLists = async () => {
    setLoading(true);
    try {
      const res = await fetch(`BASE_URL/users/${user.id}/listnames`);
      const listJSON = await res.json();
      await new Promise(resolve => {
        return resolve(setLists(listJSON));
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return [lists, loading, getLists];
};
export default useLists;
