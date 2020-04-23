import { useEffect, useState, useContext } from 'react';
// import useAuth from "./../hooks/useAuth";
import {DispatchContext, UserContext} from './../contexts/index';



const useLocalStorage = (check) => {
  const [userInfo, setUserInfo] = useState({});
  const [verified, setVerified] = useState(false);
  const [checking, setChecking] = useState(false);
  const user = useContext(UserContext);
  const dispatch = useContext(DispatchContext);

  // const [loading] = useAuth(userInfo);

  if (check === true) {
    // console.log(user);
  }
useEffect(() => {
  if (check === true) {
    checkLocal();
    // console.log('called checklocal');
    
    setChecking(true)
  }

  return () => {
    setUserInfo({})
  };
}, [check])

const checkLocal = async () => {
  if (!localStorage.getItem("user")) {
          console.log('storage empty');
        } else {
          console.log('local storage in use');
          try {
            const userUpdate = await JSON.parse(window.localStorage.getItem("user"))
            await new Promise(resolve => {
              // console.log(userUpdate);
              setUserInfo({
                  ...userInfo,
                  id: userUpdate.id,
                  username: userUpdate.username,
                  isAuthenticated: userUpdate.isAuthenticated,
                  token: userUpdate.token
               })
              return resolve(
                dispatch({
                  type: "SET_USER",
                  id: userUpdate.id,
                  username: userUpdate.username,
                  isAuthenticated: userUpdate.isAuthenticated,
                  token: userUpdate.token
                 })
              )
            })
          }catch (error) {
            console.error(error)
          } finally {
            setChecking(false);
            // console.log(userInfo);
            
            if (userInfo.id) {
             
               setVerified(true);
            }

          }
          // console.log('item from local');
        }  
}

useEffect(() => {
console.log('trigger user side effect');
// console.log(user);


  if (user && user.isAuthenticated) {
    window.localStorage.setItem("user", JSON.stringify(user))
    setVerified(true);
    console.log('user verified');
  }



  if (user){
      // notify(`Welcome ${user.user.username}`)
  }
  return () => {localStorage.clear()}
},[user])




 return [checking, verified];

}

export default useLocalStorage;