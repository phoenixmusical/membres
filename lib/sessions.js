var session = require('express-session');
var LevelStore = require('level-session-store')(session);
var level = require('level');
var config = require('s-conf');

var db = level(config.require('sessions_db'));

var store = new LevelStore(db);

module.exports = session({
	secret: config.require('secret'),
	store: store
});
