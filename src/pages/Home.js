import React, {useEffect, useState, useContext} from 'react';
import { Link } from '@reach/router';
import UserContext from './../contexts/userContext';
import Form from './../components/form/Form';
import UserList from '../components/lists/UserList';


const Home = () => {

  const user = useContext(UserContext);
  const [infoArt, setInfoArt] = useState("hide");
  const [signup, setSignup] = useState("hide")

  useEffect(() => {
    if (!user.isAuthenticated && signup === "hide") {
      setTimeout(()=> {
        setInfoArt("show")
      },5000)
    }
    
    return () => {};
  }, [user, infoArt, signup])

  const toggle = (e) => {
    e.persist();
    switch (e.target.id) {
      case "signup":
        return signup === "hide" ? setSignup("show") : setSignup("hide");
      case "infoart":
        setSignup("show");
        return setInfoArt("hide");
      default:
        return;
    }
  }
      
  return (
    <main className="home">
   
      <nav className="home-nav">

        <button><Link to="search">Find a game on BGG</Link></button>
        <button><Link to="hotlist">BGG hot 50</Link></button>
        {
          !user.isAuthenticated &&
          <>
          {signup === "show" ? (
            <>
              <button onClick={toggle} id="signup">
                close
              </button>
              
            </>
          ) : (
            <button onClick={toggle} id="signup">
              Create an Account
            </button>
          )}
        </>
        }
      </nav>

      {
        signup === "show" && !user.isAuthenticated &&
          <Form formType="CREATE" />
      }

      {
        infoArt === "show" && !user.isAuthenticated &&
        <article>
          Please create an account in order to create your own lists from the bgg database.  
          <button 
            id="infoart"
            onClick={toggle}
            className="btn-close">
              cool
          </button>
          <button> not yet. Tell me more</button>
        </article>
      }

      <article className="home-user-list">
      {
        user && user.isAuthenticated ?
        <UserList />
        :
        <p>
           
        </p>
      }
      </article>

    

    </main>
   
  )
}
export default Home;    