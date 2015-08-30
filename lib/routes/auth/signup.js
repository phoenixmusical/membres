var passport = require('passport');

exports.allowAnonymous = true;

exports.get = function(req, res){
	res.render('auth/signup', {
		email: req.flash('email')
	});
};

exports.post = passport.authenticate('local-signup', {
	successRedirect: '/',
	failureRedirect: '/signup',
	failureFlash: true
});