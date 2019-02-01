var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var params = req.parameters;
	var base_url = params.permit('u').value().u;
	var params_to_set = params.permit('p').value().p.split(',');
	var fixed_params = params.permit('v').all().v;

  res.render('index', { 
  	title: 'URL Builder',
  	params: params,
  	base_url: base_url,
  	params_to_set: params_to_set,
  	fixed_params: fixed_params
  });
});

module.exports = router;
