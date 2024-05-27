var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function(req, res, next) {
  axios.get('http://localhost:8000/deliveries') // Assuming your API is running on localhost:3000
    .then(response => {
      res.render('index', { title: 'Home', deliveries: response.data });
    })
    .catch(error => {
      console.error('Error fetching deliveries:', error);
      res.render('index', { title: 'Home', deliveries: [] });
    });
});

module.exports = router;
