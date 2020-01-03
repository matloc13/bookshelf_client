import React, {useContext, useState, useEffect} from 'react';
import UserContext from './../../contexts/userContext';
import ListContext from './../../contexts/listContext';
const UserNav = () => {

  const user = useContext(UserContext);
  const allists = useContext(ListContext);
  return (
    <nav>
      <span>hide</span>
      <ul>
        <span>users lists</span>
        {// map of users lists
        }
        <span>logout</span>
      </ul>
    </nav>
  )
}
export default UserNav; 