var passport = require('passport');
var baseUrl = require('s-conf').require('base_url');

exports.allowAnonymous = true;

exports.get = function(req, res){
	res.render('auth/login', {
		email: req.flash('email'),
		errors: []
	});
};

exports.post = passport.authenticate('local-login', {
	successRedirect: baseUrl,
	failureRedirect: baseUrl+'login',
	failureFlash: true
});

exports.post = function(req, res, next){
	passport.authenticate('local-login', function(err, user, info){
		if(err){
			return next(err);
		}
		if(user){
			return req.logIn(user, function(err) {
				if(err) {
					return next(err);
				}
				if(user.passwordChangeRequired){
					res.redirect(baseUrl+'changePassword');
				}else{
					res.redirect(baseUrl);
				}
			});
		}
		res.render('auth/login', {
			email: req.body.email,
			errors: info ? [info] : []
		});
	})(req, res, next);
};