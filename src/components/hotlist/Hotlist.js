import React, { useEffect, useContext } from "react";
import DispatchContext from "./../../contexts/dispatchContext";
import useHotlist from "./../../hooks/useHotlist";
import GameForm from "./../form/GameForm";
import NewListForm from "./../form/NewListForm";
const Hotlist = () => {
  const dispatch = useContext(DispatchContext);
  const [hotlist, loading, getHotlist] = useHotlist();
  useEffect(() => {
    getHotlist();
    return () => {};
  }, []);
  return (
    <main className="hotlist-container">
      <h2>Hot 50</h2>
      <div>
        {loading && (
          <img
            src="https://media.giphy.com/media/5KX9jiNXkb3xK/giphy.gif"
            alt="loading.."
          />
        )}
      </div>
      <>
        {hotlist.items &&
          hotlist.items.item.map((ele, index) => {
            return (
              <div key={`${index}${ele.name.value}`}>
                <div key={`${index}${ele.name.value}`}>
                  <img
                    src={ele.thumbnail.value}
                    alt={ele.name.value}
                    onClick={() =>
                      dispatch({ type: "SET_CURRENT_GAME", game: ele })
                    }
                  />
                  <span>RANK: {ele.rank}</span>
                </div>
                <GameForm formType="ADDGAME" game={ele} i={index} />
                <NewListForm formType="NewList" game={ele} i={index} />
              </div>
            );
          })}
      </>
    </main>
  );
};
export default Hotlist;
