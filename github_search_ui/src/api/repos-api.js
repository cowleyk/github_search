export function getRepos(queryString) {
    return fetch(`/repos/${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        }
    })
    .then((res) => {
        return res.json()
    })
    .then((resJson) => {
        return resJson
    })
    .catch((err) => {
        return err
    })
}