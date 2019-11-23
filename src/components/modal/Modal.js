import React, { useEffect, useState, useRef } from "react";
import {createPortal}from 'react-dom';
// import {navigate} from '@reach/router';
import useManageItem from "./../../hooks/useManageItem";

const Modal = ({setShow, show}) => {
  const modalRef = useRef(null);

  if (!modalRef.current) {
    const div = document.createElement('div');
    modalRef.current = div;
  }
  const [game, loading, getItem] = useManageItem();
  const [showPub, setShowPub] = useState(false);
  const [showDesc, setShowDesc] = useState(false);

  useEffect(() => {
    getItem();
  }, []);
  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(modalRef.current);
    return () => modalRoot.removeChild(modalRef.current);
  }, []);

  // api request needed to load game from id.
  return (createPortal(
    <div className={"gameContainer"}>
      <>
      <button onClick={()=> {
        setShow(!show);
      }
        }>close</button>
      </>
      {loading && (
        <img
          src="https://media.giphy.com/media/5KX9jiNXkb3xK/giphy.gif"
          alt="loading"
        />
      )}

      {game ? (
        <>
          {game.items && game.items.item.name.value ? (
            <div>
              <img
                src={game.items.item.thumbnail}
                alt={game.items.item.name.value}
              />
              <h3>
                {game.items.item.image && game.items.item.image ? (
                  <a href={game.items.item.image} target={"_blank"}>
                    {game.items.item.name.value}
                  </a>
                ) : (
                  ""
                )}
              </h3>
            </div>
          ) : (
            game.items.item.name[0].value && (
              <div>
                <img
                  src={game.items.item.thumbnail}
                  alt={game.items.item.name[0].value}
                />
                <h3>
                  {game.items.item.image && game.items.item.image ? (
                    <a href={game.items.item.image} target={"_blank"}>
                      {game.items.item.name[0].value}
                    </a>
                  ) : (
                    ""
                  )}
                </h3>
              </div>
            )
          )}
          {game.items.item.link.map(ele => {
            return ele.type === "boardgamedesigner" ? (
              <p>Designer: {ele.value}</p>
            ) : (
              ""
            );
          })}
          <h5
            onClick={() => {
              setShowPub(!showPub);
            }}
          >
            {!showPub ? "Publishers" : "hide"}
          </h5>
          {showPub &&
            game.items.item.link.map(ele => {
              return ele.type === "boardgamepublisher" ? (
                <p>Publisher: {ele.value}</p>
              ) : (
                ""
              );
            })}

          <h6>
            Year Published:
            {game.items.item.yearpublished &&
            game.items.item.yearpublished.value
              ? game.items.item.yearpublished.value
              : ""}
          </h6>
          <span
            onClick={() => {
              setShowDesc(!showDesc);
            }}
          >
            {!showDesc ? "description" : "close"}
          </span>

          {showDesc && (
            <p className={"description"}>
              {game.items.item.description
                .replace(/&hellip;/g, "...")
                .replace(/&#10;/g, " ")
                .replace(/&rsquo;/g, "'")
                .replace(/&ndash;/g, ":")
                .replace(/&mdash;/g, "-")
                .replace(/&quot;/g, '"')
                .replace(/&nbsp;/g, " ")
                .replace(/&amp;/g, "&")
                .replace(/&rdquo;/g, '"')
                .replace(/&ldquo;/g, '"')
                .replace(/&bull;/g, "~")
                .replace(/&ouml;/g, "ö")}
            </p>
          )}
        </>
      ) : (
        ""
      )}
    </div>, modalRef.current)
  );
};

export default Modal;
