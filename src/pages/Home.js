import React, {useEffect, useState} from 'react';
import {Redirect, Link} from '@reach/router';
const Home = () => {
const [redirect, setRedirect] = useState(false);

    useEffect(() => {
      if (!redirect) {
        setTimeout(() => {
         setRedirect(!redirect);
      }, 4000);
    }
    }, [redirect])
      
  return (
    <div className="home">
      <Link to="search"><h1>Welcome to BGG-Lister</h1></Link>
    </div>
  )
}
export default Home;    