// import {useReducer } from 'react';
// import userReducer from "./reducers/userReducer";
// import singleListReducer from "./reducers/singleListReducer";
// import listReducer from "./reducers/listReducer";
// import currentReducer from "./reducers/currentReducer";
// import searchReducer from "./reducers/searchReducer";
// import DispatchContext from "./contexts/dispatchContext";
// const initUser = {
//   id: null,
//   username: "",
//   token: null,
//   isAuthenticated: false
// };
// const initSearch = {
//   searchResults: [],
//   searchLength: 1
// };
// const initState = [[]];
// const initSingle = [];
// const currentItem = {
//   gameid: null,
//   listid: null,
//   gameuserid: null
// };
//  const storeReducer = () => {

 
// const [user, dispatchUser] = useReducer(userReducer, initUser);
//   const [list, dispatchList] = useReducer(listReducer, initState);
//   const [sList, dispatchSList] = useReducer(singleListReducer, initSingle);
//   const [current, dispatchCurrent] = useReducer(currentReducer, currentItem);
//   const [search, dispatchSearch] = useReducer(searchReducer, initSearch)

//   const dispatch = action => {
//     [dispatchUser, dispatchList, dispatchSList, dispatchCurrent, dispatchSearch].forEach(fn =>
//       fn(action)
//     );
//   };

//   const allLists = { list, sList, current, search };

//   const storeObject = {... store,
//     allLists,
//     dispatch,
//     user,
//   }
//   return storeObject
// }
// export default storeReducer ;