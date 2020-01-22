import React, { useEffect, useState, useRef } from "react";
import { createPortal }from 'react-dom';
import FadeIn from 'react-fade-in';

import useManageItem from "./../../hooks/useManageItem";

const Modal = ({setShow, show}) => {
  const modalRef = useRef(null);

  if (!modalRef.current) {
    const div = document.createElement('div');
    modalRef.current = div;
  }
  const [game, loading, getItem, deleteItem, response, topPlayerCount] = useManageItem();//eslint-disable-line
  const [hide, setHide] = useState({
    pub: false,
    art: false,
    cat: false,
    mech: false,
    ex: false,
    moreInfo: false,
    desc: false
  })
  

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
        <aside className="loading-div">
          <img
            className="modal-img"
            src="https://media.giphy.com/media/5KX9jiNXkb3xK/giphy.gif"
            alt="loading"
          />
        </aside>
       
      )}

      {game ? (
        <FadeIn>           
        <div className="game-modal" key={game.id}>
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
              <div className="game-title">
              <h3 className="game-top-title">
                {game.items.item.image && game.items.item.image ? (
                  <a href={game.items.item.image} target={"_blank"}>
                    {game.items.item.name.value}
                  </a>
                ) : (
                  ""
                )}
              </h3>
              <h6>Preferred Player Count {topPlayerCount.playercount}</h6>
          </div>
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
                <div className="game-title">
                <h3 className="game-top-title">
                  {game.items.item.image && game.items.item.image ? (
                    <a href={game.items.item.image} target={"_blank"}>
                      {game.items.item.name[0].value}
                    </a>
                  ) : (
                    ""
                  )}
                </h3>
                </div>
                <h6>Preferred Player Count {topPlayerCount.playercount}</h6>
              </div>
            )
          )}
       
          <div className="modal-info">
          <h6 className="info-year">
            Year Published: {
            game.items.item.yearpublished &&
            game.items.item.yearpublished.value
              ? game.items.item.yearpublished.value
              : ""}
          </h6>
        
             <h6
          className={!hide.moreInfo ? "info-more-info" : "info-more-info hide"} 
          onClick={() => {
            setHide({...hide, moreInfo:!hide.moreInfo})
            }}>{!hide.moreInfo ? "More Info" : "hide"}</h6>
          {hide.moreInfo &&   
          <FadeIn> 
        <section className="more-info">
        
            {game.items.item.link.map((ele, i) => {
            return ele.type === "boardgamedesigner" ? (
              <FadeIn>
              <h6  key={i}className="info-designer">Designer: {ele.value}</h6>
              </FadeIn>
            ) : (
              ""
            );
          })}
          
          <h6 className="info-playingtime">
            Playing Time: {
              game.items.item.playingtime &&
            game.items.item.playingtime.value
          }
          </h6>
       

          <h6
            className={!hide.art ? "info-artist" : "info-artist hide"}
            onClick={() => {
              setHide({...hide, art: !hide.art});
            }}>
            {!hide.art ? "Artists" : "hide"}
          </h6>
          {hide.art &&
            game.items.item.link.map((ele, i) => {
              return ele.type === "boardgameartist" ? (
                <FadeIn>
                <p key={i} className="info-artist">Artist: {ele.value}</p>
                </FadeIn>
              ) : (
                ""
              );
            })}
       
          <h6
            className={!hide.pub ? "info-publisher" : "info-publisher hide"}
            onClick={() => {
              setHide({...hide, pub: !hide.pub});
            }}>
            {!hide.pub ? "Publishers" : "hide"}
          </h6>
          {hide.pub &&
            game.items.item.link.map((ele, i) => {
              return ele.type === "boardgamepublisher" ? (
                <FadeIn>
                <p key={i} className="info-publisher">Publisher: {ele.value}</p>
                </FadeIn>
              ) : (
                ""
              );
            })}
          <h6 
            className={!hide.cat ? "info-cat" : "info-cat hide" }
            onClick={() => {
              setHide({...hide,cat: !hide.cat});
              }}>
                {!hide.cat ? "Categories" : "hide"}
          </h6>
            {hide.cat &&
            game.items.item.link.map((ele, i) => {
              return ele.type === "boardgamecategory" ? (
                <FadeIn>
                <p key={i} className="info-cat"> Category: {ele.value}</p>
                </FadeIn>
              ) : (
                ""
              );
            })}
            
        <h6 
        className={!hide.mech ? "info-mech" : "info-mech hide"}
        onClick={() => {
          setHide({...hide, mech: !hide.mech});
        }}
        >
          {!hide.mech ? "Mechanicisms": "hide"}
        </h6>
        {hide.mech &&
            game.items.item.link.map((ele, i) => {
              return ele.type === "boardgamemechanic" ? (
                <FadeIn>
                <p key={i} className="info-mech"> Category: {ele.value}</p>
                </FadeIn>
              ) : (
                ""
              );
            })}

        <h6 
          className={!hide.ex ? "info-expansion": "info-expansion hide"}
          onClick={() => {
            setHide({...hide, ex: !hide.ex});
        }}
          >
          {!hide.ex ? "Expansions": "hide"}
        </h6>
        {hide.ex &&
            game.items.item.link.map((ele, i) => {
              return ele.type === "boardgameexpansion" ? (
                <FadeIn>
                <p key={i} className="info-mech"> Expansion: {ele.value}</p>
                </FadeIn>
              ) : (
                ""
              );
            })}
     
      </section>
      </FadeIn>
      }
        
          <h6
            className={!hide.desc ? "description-button" : "description-button hide "}
            onClick={() => {
              setHide({...hide, desc: !hide.desc});
            }}
          >
            {!hide.desc ? "description" : "hide"}
          </h6>

          {hide.desc &&
          <FadeIn>
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
                .replace(/&ouml;/g, "ö")
                .replace(/&#226;/g, "â")
                .replace(/&#128;/g, "€")
                .replace(/&#139;/g, "‹")}
            </p>
          </FadeIn>
          }
          </div>
        </div>
        </FadeIn>

      ) : (
        ""
      )}
    </div>, modalRef.current)
  );
};

export default Modal;
