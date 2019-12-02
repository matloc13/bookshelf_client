import { useState } from "react";
import BASE_URL from "./../constants";

const useHotlist = () => {
  const [hotlist, setHotlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const getHotlist = async () => {
    
    setHotlist([])
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

  return [hotlist, loading, getHotlist, setHotlist];
};
export default useHotlist;
