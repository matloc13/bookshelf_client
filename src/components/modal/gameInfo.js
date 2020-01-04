import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';
import useManageItem from './../../hooks/useManageItem';

const GameInfo = ({ set, gameInfo}) => {
  const [game, loading, getItem, deleteItem, response, topPlayerCount] = useManageItem();

  const [show, setShow] = useState({
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
    return () => {
      
    };
  }, [gameInfo])

  return (
    
<main className="game-info-container " key={game ? game.items.item.id: ""}>
    <aside className="loading-container">
       {loading && (
  
        <img
          className="modal-img"
          src="https://media.giphy.com/media/5KX9jiNXkb3xK/giphy.gif"
          alt="loading"
        />
       
      )}
      </aside>
    

     {game ? (
      <section  id={game.items.item.id} key={game.items.item.id}>        
        <div className="game-info-box">
          <span 
            className="button icon-button"  
            onClick={()=> {
              const box = document.querySelector('.game-info-box');
              box.classList.add('close')
            set(!gameInfo);
            }
             }> 
             <h6 className="icon-text"> 
               close
             </h6>        
          </span>
          {game.items && game.items.item.name.value ? (
            <div className="info-top">
             
              <h3 className="game-title">
                {game.items.item.image && game.items.item.image ? (
                  // <a href={game.items.item.image} target={"_blank"}>
                  //   {game.items.item.name.value}
                  // </a>
                  <Link 
                    to={game.items.item.image}
                    target={"_blank"}>
                        {game.items.item.name.value}
                  </Link>
                ) : (
                  ""
                )}
              </h3>
                <h6>Preferred Player Count {topPlayerCount.playercount}</h6>
            </div>
          ) : (
            game.items.item.name[0].value && (
              <div className="info-top">
             
                <h3 className="game-title">
                  {game.items.item.image && game.items.item.image ? (
                    <a href={game.items.item.image} target={"_blank"}>
                      {game.items.item.name[0].value}
                    </a>
                  ) : (
                    ""
                  )}
                </h3>
                <h6>Preferred Player Count {topPlayerCount.playercount}</h6>
              </div>
            )
          )}
          <div className="modal-info">
          {game.items.item.link.map((ele, i) => {
            return ele.type === "boardgamedesigner" ? (
              <h6 key={i} className="info-designer">Designer: {ele.value}</h6>
            ) : (
              ""
            );
          })}

          <h6
          className={!show.moreInfo ? 'info-more-info' : 'info-more-info hide'} 
          onClick={() => {
            setShow({...show, moreInfo:!show.moreInfo})
            }}>{!show.moreInfo ? "More Info" : "hide"}</h6>

            {show.moreInfo &&
        <section className="more-info">
          
          <h6 className="info-playingtime">
            Playing Time: {
              game.items.item.playingtime &&
            game.items.item.playingtime.value
          }
          </h6>
          <h6 className="info-year">
            Year Published: {
            game.items.item.yearpublished &&
            game.items.item.yearpublished.value
              ? game.items.item.yearpublished.value
              : ""}
          </h6>

          <h6
            className={!show.art ? "info-artist" : " hide info-artist"}
            onClick={() => {
              setShow({...show, art: !show.art});
            }}
          >
            {!show.art ? "Artists" : "hide"}
          </h6>
          {show.art &&
            game.items.item.link.map((ele, i) => {
              return ele.type === "boardgameartist" ? (
                <p key={i} className="info-artist">Artist: {ele.value}</p>
              ) : (
                ""
              );
            })}
       
          <h6
            className={!show.pub ? "info-publisher" : "info-publisher hide"}
            onClick={() => {
              setShow({...show, pub: !show.pub});
            }}
          >
            {!show.pub ? "Publishers" : "hide"}
          </h6>
          {show.pub &&
            game.items.item.link.map((ele, i) => {
              return ele.type === "boardgamepublisher" ? (
                <p key={i} className= "info-publisher">
                  Publisher: {ele.value}</p>
              ) : (
                ""
              );
            })}
            <h6 
              className={!show.cat ? "info-cat" : "info-cat hide"} 
              onClick={() => {
                setShow({...show,cat: !show.cat});
              }}>
                {!show.cat ? "Categories" : "hide"}
              </h6>
              {show.cat &&
            game.items.item.link.map((ele, i) => {
              return ele.type === "boardgamecategory" ? (
                <p key={i} className="info-cat"> Category: {ele.value}</p>
              ) : (
                ""
              );
            })}
            
        <h6 
        className={!show.mech ? "info-mech" : "info-mech hide"}
        onClick={() => {
          setShow({...show, mech: !show.mech});
        }}
        >
          {!show.mech ? "Mechanicisms": "hide"}
        </h6>
        {show.mech &&
            game.items.item.link.map((ele, i) => {
              return ele.type === "boardgamemechanic" ? (
                <p key={i} className="info-mech"> Category: {ele.value}</p>
              ) : (
                ""
              );
            })}

      <h6 
        className={!show.ex ? "info-expansion" : "info-expansion hide"}
        onClick={() => {
          setShow({...show, ex: !show.ex});
        }}>
          {!show.ex ? "Expansions": "hide"}
        </h6>
        {show.ex &&
            game.items.item.link.map((ele, i) => {
              return ele.type === "boardgameexpansion" ? (
                <p key={i} className="info-mech"> Expansion: {ele.value}</p>
              ) : (
                ""
              );
            })}

</section>
}
          <h6
            className={!show.desc ? "description-button" : "description-button hide"}
            onClick={() => {
              setShow({...show, desc: !show.desc});
            }}
          >
            {!show.desc ? "Description" : "hide"}
          </h6>

          {show.desc && (
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

        </section>  
      ) : (
    ""
      )
  }
</main>
)
}
export default GameInfo;    