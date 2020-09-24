const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET repos listing. */
router.get('/:owner/:repoName', function(req, res, next) {
    console.log('DETAILS ENDPOINT')
    console.log(req.params)
  // example url: https://api.github.com/repos/andbet39/Hotel
  return axios.get(`https://api.github.com/repos/${req.params.owner}/${req.params.repoName}`)
  .then((resp) => {
      console.log('repo details')
      console.log(resp.data.full_name)
    res.json({ message: 'DETAILS ENDPOINT', details: resp.data })
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
