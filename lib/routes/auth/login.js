var passport = require('passport');
var baseUrl = require('s-conf').require('base_url');

exports.allowAnonymous = true;

exports.get = function(req, res){
	res.render('auth/login', {
		email: req.flash('email')
	});
};

exports.post = passport.authenticate('local-login', {
	successRedirect: baseUrl,
	failureRedirect: baseUrl+'login',
	failureFlash: true
});