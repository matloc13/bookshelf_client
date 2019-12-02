import React, { useEffect, useState } from 'react';
import useManageItem from './../../hooks/useManageItem';


const GameInfo = ({ set, gameInfo}) => {

  const [game, loading, getItem] = useManageItem();
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
    console.log(game);
    
    return () => {
      
     
    };
  }, [gameInfo])


 
  return (
    
<main className="game-info-container " key={game ? game.items.item.id: ""}>
    <div className="loading-container" key={1+"loading"}>
       {loading && (
  
        <img
          className="modal-img"
          src="https://media.giphy.com/media/5KX9jiNXkb3xK/giphy.gif"
          alt="loading"
        />
       
      )}
      </div>
    

     {game ? (
      <section  id={game.items.item.id} key={game.items.item.id}>        
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

          <h6
          className={'info-more-info'} 
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
            className="info-artist"
            onClick={() => {
              setShow({...show, art: !show.art});
            }}
          >
            {!show.art ? "Artists" : "hide"}
          </h6>
          {show.art &&
            game.items.item.link.map(ele => {
              return ele.type === "boardgameartist" ? (
                <p className="info-artist">Artist: {ele.value}</p>
              ) : (
                ""
              );
            })}
       
          <h6
            className="info-publisher"
            onClick={() => {
              setShow({...show, pub: !show.pub});
            }}
          >
            {!show.pub ? "Publishers" : "hide"}
          </h6>
          {show.pub &&
            game.items.item.link.map(ele => {
              return ele.type === "boardgamepublisher" ? (
                <p className="info-publisher">Publisher: {ele.value}</p>
              ) : (
                ""
              );
            })}
            <h6 
              className="info-cat" 
              onClick={() => {
                setShow({...show,cat: !show.cat});
              }}>
                {!show.cat ? "Categories" : "hide"}
              </h6>
              {show.cat &&
            game.items.item.link.map(ele => {
              return ele.type === "boardgamecategory" ? (
                <p className="info-cat"> Category: {ele.value}</p>
              ) : (
                ""
              );
            })}
            
        <h6 
        className="info-mech"
        onClick={() => {
          setShow({...show, mech: !show.mech});
        }}
        >
          {!show.mech ? "Mechanicisms": "hide"}
        </h6>
        {show.mech &&
            game.items.item.link.map(ele => {
              return ele.type === "boardgamemechanic" ? (
                <p className="info-mech"> Category: {ele.value}</p>
              ) : (
                ""
              );
            })}

      <h6 
        className="info-expansion "
        onClick={() => {
          setShow({...show, ex: !show.ex});
        }}>
          {!show.ex ? "Expansions": "hide"}
        </h6>
        {show.ex &&
            game.items.item.link.map(ele => {
              return ele.type === "boardgameexpansion" ? (
                <p className="info-mech"> Expansion: {ele.value}</p>
              ) : (
                ""
              );
            })}

</section>
}
          <h6
            className="description-button"
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