import React, {useEffect, useState, useContext} from 'react';
import { Link } from '@reach/router';
import UserContext from './../contexts/userContext';
import Form from './../components/form/Form';


const Home = () => {

  const user = useContext(UserContext);
  const [infoArt, setInfoArt] = useState("hide");
  const [signup, setSignup] = useState("hide")

  useEffect(() => {
    if (!user.isAuthenticated) {
      setTimeout(()=> {
        setInfoArt("show")
      },5000)
    }
    
    return () => {};
  }, [user, infoArt])

  const toggle = (e) => {
    e.persist();
    switch (e.target.id) {
      case "signup":
        return signup === "hide" ? setSignup("show") : setSignup("hide");
      case "infoart":
        return setInfoArt("hide");
      default:
        return;
    }
  }
      
  return (
    <main className="home">
   
      <nav>
        <h1>BGG-LISTER</h1>
        <Link to="search"><span>find something on BGG</span></Link>
        <Link to="hotlist"><span>BGG hot 50</span></Link>
        {
          !user.isAuthenticated &&
          <>
          {signup === "show" ? (
            <>
              <span onClick={toggle} id="signup">
                close
              </span>
              <Form formType="CREATE" />
              
            </>
          ) : (
            <span onClick={toggle} id="signup">
              Create an Account
            </span>
          )}
        </>
        }
      </nav>


      {
        infoArt === "show" && 
        <article>Please login to view and create lists. 
          <button 
            id="infoart"
            onClick={toggle}
            className="btn-close">
              cool
          </button>
        </article>
      }

    </main>
   
  )
}
export default Home;    