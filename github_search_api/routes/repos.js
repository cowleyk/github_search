const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET repos listing. */
router.get('/:queryString', function(req, res, next) {
  // example url: https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars
  return axios.get(`https://api.github.com/search/repositories?q=${req.params.queryString}`)
  .then((resp) => {
    console.log('Link to be used for fetching next page; ')
    console.log(resp.headers.link)
    res.json({ message: 'REPOS ENDPOINT', items: resp.data.items })
  })
  .catch((err) => {
    console.log('ERROR')
    if(err.response) {
      res.status(err.response.status).json({ message: err.response.statusText })
    } else {
      res.status(400).json({ message: 'Error fetching repos' })
    }
  })
  
});

module.exports = router;
