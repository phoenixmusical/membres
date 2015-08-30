var express = require('express');

var routes = module.exports = new express.Router();

routes.get('/', function(req, res){
	res.render('index', {
		
	});
});
