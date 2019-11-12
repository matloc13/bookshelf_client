import React, { useEffect, useState } from "react";
import useHotlist from "./../../hooks/useHotlist";
import GameForm from "./../form/GameForm";
import NewListForm from "./../form/NewListForm";
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
                  <GameForm formType="ADDGAME" game={ele} i={index} />
                  <NewListForm formType="NewList" game={ele} i={index} />
                </div>
              );
            })
          : ""}
      </>
    </main>
  );
};
export default Hotlist;
