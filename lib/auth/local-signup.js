var LocalStrategy    = require('passport-local').Strategy;
var config = require('s-conf');
var User = require('../models/user');

module.exports = new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, function(req, email, password, done) {
	User.findOne({
		email: email.toLowerCase()
	}, function(err, user){
		if(err){
			return done(err);
		}
		
		if(user){
			return done(null, false, req.flash('errorMessage', "Ce courriel est déjà utilisé."));
		}
		
		user = new User();
		user.email = email.toLowerCase();
		user.isAdmin = false;
		
		user.setPassword(password, function(err){
			if(err){
				return done(err);
			}
			user.save(function(err){
				if(err){
					return done(err);
				}
				done(null, user);
			});
		});
	});
});