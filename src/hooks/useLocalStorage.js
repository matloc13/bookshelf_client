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

  if (check) {
    console.log(user);
  }
useEffect(() => {
  checkLocal()
  setChecking(true)
  return () => {
    setUserInfo({})
  };
}, [])

const checkLocal = async () => {
  if (!localStorage.getItem("user")) {
          console.log('storage empty');
        } else {
          console.log('local storage in use');
          try {
            const userUpdate = await JSON.parse(window.localStorage.getItem("user"))
            await new Promise(resolve => {
              console.log(userUpdate);
              return resolve(
                setUserInfo(userUpdate)
              )
            })
          }catch (error) {
            console.error(error)
          } finally {
            setChecking(false);
            if (userInfo.id) {
              dispatch({
                type: "SET_USER",
                id: userInfo.id,
                username: userInfo.username,
                isAuthenticated: true,
                token: userInfo.token
               })
               setVerified(true);
            }

          }
          console.log('item from local');
        }
        
}

  // useEffect(() => {
  //   // console.log('did load')
   
  //   if (!localStorage.getItem("user")) {
  //     console.log('storage empty');
  //   } else {
  //     console.log('local storage in use');
  //     try {
  //       setUserInfo(JSON.parse(window.localStorage.getItem("user")))
  //       console.log(JSON.parse(window.localStorage.getItem("user")));
        
  //     }catch (error) {
  //       console.error(error)
  //     } finally {
  //       console.log(user);
  //     }
  //     console.log('item from local');
  //   }
  //   return () => {
  //     console.log('clear hot list')
  //   }
  // },[])

useEffect(() => {
console.log('trigger user side effect...');
console.log(user);


  if (user && user.isAuthenticated) {
    localStorage.setItem("user", JSON.stringify(user))
    setVerified(true);
    console.log('user set');
  }



  if (user){
      // notify(`Welcome ${user.user.username}`)
  }
  return () => {localStorage.clear()}
},[user])




 return [checking];

}

export default useLocalStorage;