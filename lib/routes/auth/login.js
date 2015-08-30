var passport = require('passport');

exports.allowAnonymous = true;

exports.get = function(req, res){
	res.render('auth/login', {
		email: req.flash('email')
	});
};

exports.post = passport.authenticate('local-login', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
});