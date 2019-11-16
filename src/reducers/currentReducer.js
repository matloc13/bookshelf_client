const currentReducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_GAME":
      return (state = action.game);
    default:
      return;
  }
};
export default currentReducer;
