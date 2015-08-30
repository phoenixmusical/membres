var express = require('express');
var loginRequired = require('./login-required');

var routes = module.exports = new express.Router();

function route(url, path){
	var route = require(path);
	for(var key in route){
		if(key !== 'allowAnonymous'){
			if(route.allowAnonymous){
				routes[key](url, route[key]);
			}else{
				routes[key](url, loginRequired, route[key]);
			}
		}
	}
}

route('/', './home');
route('/profile', './profile');

//auth
route('/login', './auth/login');
route('/logout', './auth/logout');
route('/signup', './auth/signup');

//users
route('/users/manage', './users/manage');
route('/users/:id/update', './users/update');
route('/users/:id/remove', './users/remove');
