export const SET_REPOS = 'SET_REPOS'
export const SET_DETAILS = 'SET_DETAILS'

export function setRepos(repos) {
  return { type: SET_REPOS, repos }
}

export function setDetails(details) {
  return { type: SET_DETAILS, details }
}

