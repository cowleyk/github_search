import {
    SET_DETAILS
  } from '../actions/Actions'
  
  export const initialState = {}
  
  function details(state = initialState, action) {
    switch (action.type) {
      case SET_DETAILS:
        return {
          ...action.details
        }
      default:
        return state
    }
  }
  
  export default details