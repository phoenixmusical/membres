var LocalStrategy    = require('passport-local').Strategy;
var config = require('s-conf');
var User = require('../models/user');

module.exports = new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, function(req, email, password, done){
	User.findOne({
		email: email.toLowerCase()
	}, function(err, user){
		if(err){
			return done(err);
		}
		
		if(!user){
			req.flash('email', email);
			return done(null, false, "Courriel invalide");
		}
		
		user.validatePassword(password, function(err, isValid){
			if(err){
				return done(err);
			}
			
			if(!isValid){
				req.flash('email', email);
				return done(null, false, "Mot de passe incorrecte");
			}
			
			done(null, user);
		});
	});
});