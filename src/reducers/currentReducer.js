const currentReducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_GAME":
      return {
        ...state, gameid: action.game
      };
    case 'DELETE_ITEM':
      return {
        ...state, listid: action.list, gameuserid: action.id, gameid: action.game
      }
      default:
        return;
  }
};
export default currentReducer;