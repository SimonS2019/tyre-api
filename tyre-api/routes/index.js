var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/helloworld', function(req, res, next) {
  res.send('Hello World');
});

module.exports = router;