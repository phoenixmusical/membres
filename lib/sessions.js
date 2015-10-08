var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var config = require('s-conf');

var store = new MongoStore({
	mongooseConnection: mongoose.connection
});

module.exports = session({
	secret: config.require('secret'),
	store: store
});
