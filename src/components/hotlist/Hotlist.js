import React, { useEffect, useContext, useState } from "react";
import DispatchContext from "./../../contexts/dispatchContext";
import UserContext from "./../../contexts/userContext";
import useHotlist from "./../../hooks/useHotlist";
import Modal from "./../modal/Modal";
import GameForm from "./../form/GameForm";
import NewListForm from "./../form/NewListForm";
import useListGenerator from "../../hooks/useListGenerator";

const Hotlist = () => {
  const dispatch = useContext(DispatchContext);
  const user = useContext(UserContext);

  const [hotlist, loading, getHotlist] = useHotlist();
  const [get, setGet] = useState({});
  const [show, setShow] = useState(false);
  const [] = useListGenerator(get);
  const handleClick = async ele => {
    dispatch({ type: "SET_CURRENT_GAME", game: ele.id });
    setShow(!show);
  };

  useEffect(() => {
    getHotlist();

    return () => {};
  }, []);

  useEffect(() => {
    if (user) {
      setGet({ type: "GET_LIST", payload: "getting" });
    }

    return () => {};
  }, [user]);

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
