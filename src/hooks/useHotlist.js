import { useEffect, useState } from "react";
import BASE_URL from "./../constants";

const useHotlist = get => {
  const [hotlist, setHotlist] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (get === true) {
      getHotlist();
    }
    return () => {
      console.log("current top");
    };
  }, [get]);

  const getHotlist = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/hotlists`);
      const json = await res.json();
      setHotlist(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return [hotlist, loading];
};
export default useHotlist;
