var path = require('path');
var express = require('express');
var ejsMate = require('ejs-mate');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var config = require('s-conf');
var renderMain = require('./render-main');
var sessions = require('./sessions');
require('./auth');

var baseUrl = config.require('base_url');

var app = module.exports = express();

app.engine('ejs', ejsMate);
app.set('views', path.resolve(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(sessions);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next){
	res.locals.baseUrl = baseUrl;
	res.locals.currentUser = req.user;
	var errorMessage = req.flash('errorMessage');
	res.locals.errorMessage = errorMessage && errorMessage[0] ? errorMessage[0] : "";
	next();
});
app.use(renderMain);

app.use(require('./routes'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.use(function(req, res, next){
	next(new Error("Not found"));
});
app.use(function(err, req, res, next){
	if(!(err instanceof Error)){
		err = new Error(String(err));
	}
	res.render('error', {
		error: err
	});
});
