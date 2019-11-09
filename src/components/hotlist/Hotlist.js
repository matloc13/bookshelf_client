import React, { useEffect, useState } from "react";
import useHotlist from "./../../hooks/useHotlist";
const Hotlist = () => {
  const [get, setGet] = useState(false);
  const [hotlist, loading] = useHotlist(get);
  useEffect(() => {
    setGet(true);
    return () => {
      setGet(false);
    };
  }, []);
  return (
    <main className="hotlist-container">
      <h2>Hot 50</h2>
      <div>{loading && <h1>...LOADING</h1>}</div>
      <>
        {hotlist.items
          ? hotlist.items.item.map((ele, index) => {
              return (
                <div key={`${index}${ele.name.value}`}>
                  <div key={`${index}${ele.name.value}`}>
                    <img
                      src={ele.thumbnail.value}
                      alt="ele.name.value"
                      onClick={() => {}}
                    />
                    <span>RANK: {ele.rank}</span>
                  </div>
                </div>
              );
            })
          : ""}
      </>
    </main>
  );
};
export default Hotlist;
