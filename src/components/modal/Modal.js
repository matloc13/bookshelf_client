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
  }, []); //eslint-disable-line
  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(modalRef.current);
    return () => modalRoot.removeChild(modalRef.current);
  }, []);

  // api request needed to load game from id.
  return (createPortal(
    <div className={"game-container modal-container"}>
   
      {loading && (
        <img
          className="modal-img"
          src="https://media.giphy.com/media/5KX9jiNXkb3xK/giphy.gif"
          alt="loading"
        />
      )}

      {game ? (
                   
        <div className="game-modal">
          {/* button */}
          <span 
            className="button"  
            onClick={()=> {
            setShow(!show);
            }
             }>
          close
          </span>
          {/* thumbnail */}
          {game.items && game.items.item.name.value ? (
            <div className="modal-top">
              <img
                className="modal-img"
                src={game.items.item.thumbnail}
                alt={game.items.item.name.value}
              />
              {/* title and link */}
              <h3 className="game-title">
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
            // thumbnail alternate result form api
       
            game.items.item.name[0].value && (
              <div className="modal-top">
                      {/* thumbnail alternate */}
                <img
                  className="modal-img"
                  src={game.items.item.thumbnail}
                  alt={game.items.item.name[0].value}
                />
                {/* title alternate */}
                <h3 className="game-title">
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
          <div className="modal-info">
          {game.items.item.link.map(ele => {
            return ele.type === "boardgamedesigner" ? (
              <h6 className="info-designer">Designer: {ele.value}</h6>
            ) : (
              ""
            );
          })}
          <h6 className="info-year">
            Year Published:
            {game.items.item.yearpublished &&
            game.items.item.yearpublished.value
              ? game.items.item.yearpublished.value
              : ""}
          </h6>
       
          <h6
            className="info-publisher"
            onClick={() => {
              setShowPub(!showPub);
            }}
          >
            {!showPub ? "Publishers" : "hide"}
          </h6>
          {showPub &&
            game.items.item.link.map(ele => {
              return ele.type === "boardgamepublisher" ? (
                <p className="info-publisher">Publisher: {ele.value}</p>
              ) : (
                ""
              );
            })}

        
          <h6
            className="description-button"
            onClick={() => {
              setShowDesc(!showDesc);
            }}
          >
            {!showDesc ? "description" : "close"}
          </h6>

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
          </div>
        </div>

      ) : (
        ""
      )}
    </div>, modalRef.current)
  );
};

export default Modal;
