import React, { useEffect, useState } from 'react';
import useManageItem from './../../hooks/useManageItem';


const GameInfo = ({ set, gameInfo}) => {

  const [game, loading, getItem] = useManageItem();
  const [showPub, setShowPub] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  useEffect(() => {
   
      getItem();
    console.log(game);
    
    return () => {
     console.log(game);
     
    };
  }, [gameInfo])

  return (
    


<main className="game-info-container">
    <div className="loading-container">
       {loading && (
  
        <img
          className="modal-img"
          src="https://media.giphy.com/media/5KX9jiNXkb3xK/giphy.gif"
          alt="loading"
        />
       
      )}
      </div>
    

     {game ? (
      <section  id={game.items.item.id} >        
        <div className="game-info-box">
          <span 
            className="button icon-button"  
            onClick={()=> {
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

        </section>  
      ) : (
    ""
      )
  }
</main>
)
}
export default GameInfo;    