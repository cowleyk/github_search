import {
    LOGIN,
    LOGOUT
  } from '../actions/Actions'
  
  export const initialState = {
    isAuthenticated: !!localStorage.getItem("user"),
    user: JSON.parse(localStorage.getItem("user")) || {},
  }
  
  function details(state = initialState, action) {
    switch (action.type) {
      case LOGIN:
        console.log('reducer user; ', action.user)
        localStorage.setItem("user", JSON.stringify(action.user));
        return {
          user: action.user,
          isAuthenticated: true
        }
      case LOGOUT:
        localStorage.removeItem("user");
        return state
      default:
        localStorage.removeItem("user");
        return state
    }
  }
  
  export default details