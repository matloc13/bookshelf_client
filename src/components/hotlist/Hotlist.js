import React, { useEffect, useContext, useState } from "react";
import DispatchContext from "./../../contexts/dispatchContext";
import useHotlist from "./../../hooks/useHotlist";
import Modal from "./../modal/Modal";
import GameForm from "./../form/GameForm";
import NewListForm from "./../form/NewListForm";

const Hotlist = () => {
  const dispatch = useContext(DispatchContext);
  const [hotlist, loading, getHotlist] = useHotlist();
  const [show, setShow] = useState(false);

  const handleClick = async ele => {
    dispatch({ type: "SET_CURRENT_GAME", game: ele.id });
    setShow(!show);
  };

  useEffect(() => {
    getHotlist();
    return () => {};
  }, []);
  return (
    <main className="hotlist-container">
      {show && <Modal />}

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
                    onClick={() => handleClick(ele)}
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
