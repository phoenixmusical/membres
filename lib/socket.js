var SockSubIO = require('socksub.io');
var sessions = require('./sessions');
var deserializeUser = require('./auth/deserialize-user');
var dataTree = require('./datatree');

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
	return handler(params, context).catch(function (error) {
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
