const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        id: action.id,
          username: action.username,
          token: action.token
      }
      case "LOGOUT_USER":
        return state = [];
      default:
        return state;
  }
}
export default userReducer;