import {
  SET_REPOS,
} from '../actions/Actions'

export const initialState = {}

function repos(state = initialState, action) {
  switch (action.type) {
    case SET_REPOS:
      return action.repos
    default:
      return state
  }
}

export default repos