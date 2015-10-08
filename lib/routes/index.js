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
route('/changePassword', './auth/changePassword');

//users
route('/users/manage', './users/manage');
route('/users/create', './users/create');
route('/users/:id/update', './users/update');
route('/users/:id/remove', './users/remove');

//comities
route('/comities/manage', './comities/manage');
route('/comities/create', './comities/create');
route('/comities/:id', './comities/view');
route('/comities/:id/update', './comities/update');
route('/comities/:id/remove', './comities/remove');
route('/comities/:comity/events/create', './comities/events/create');
route('/comities/:comity/events/:event', './comities/events/view');
route('/comities/:comity/posts/create', './comities/posts/create');
route('/comities/:comity/posts/:post', './comities/posts/view');

//events
route('/events/manage', './events/manage');
route('/events/create', './events/create');
route('/events/:id', './events/view');
route('/events/:id/update', './events/update');
route('/events/:id/remove', './events/remove');
