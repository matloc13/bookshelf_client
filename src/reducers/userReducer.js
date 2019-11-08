const userReducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return;
    case "LOGIN_USER":
      return;
    case "LOGOUT_USER":
      return;
    default:
      return state;
  }
}
export default userReducer;