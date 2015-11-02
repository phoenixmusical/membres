var SockSubIO = require('socksub.io');
var Promise = require('bluebird');
var sessions = require('./sessions');
var deserializeUser = require('./auth/deserialize-user');
var dataTree = require('./datatree');
var actions = require('./actions');

var socket = module.exports = SockSubIO();

socket.expose('query', function (method, params) {
	var req = this.request;
	var context = {
		user: req.user
	};
	params = params || {};
	var handler = dataTree[method];
	if (typeof handler !== 'function') {
		throw new Error("Invalid query method '" + method + "'");
	}
	return Promise.try(function () {
		return handler(params, context);
	}).catch(function (error) {
		console.error(error.stack);
		throw error;
	});
});

socket.expose('action', function (method, params) {
	var req = this.request;
	var context = {
		user: req.user
	};
	params = params || {};
	var handler = actions[method];
	if (typeof handler !== 'function') {
		throw new Error("Invalid action method '" + method + "'");
	}
	return Promise.try(function () {
		return handler(params, context);
	}).catch(function (error) {
		console.error(error.stack);
		throw error;
	});
});

socket.use(function sessionHandler(socket, next) {
	var req = socket.request;
	var res = {};
	sessions(req, res, next);
});

socket.use(function authentication(socket, next) {
	var req = socket.request;
	if (!req.session || !req.session.passport) {
		return next();
	}
	deserializeUser(req.session.passport.user, function(err, user){
		if(err){
			return next(err);
		}
		req.user = user;
		next();
	});
});

socket.use(function loginRequired(socket, next) {
	var req = socket.request;
	if (!req.user) {
		return next(new Error("Unauthorized"));
	}
	next();
});
