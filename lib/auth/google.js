var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('s-conf');
var User = require('../models/user');

var baseUrl = config.require('base_url');
var googleAuthConfig = config.require('google_auth');

module.exports = new GoogleStrategy({
	clientID: googleAuthConfig.client_id,
	clientSecret: googleAuthConfig.client_secret,
	callbackURL: baseUrl+'/auth/google/callback',
	passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
}, function(req, token, refreshToken, profile, done){
	
	function linkUser(user){
		user.google.token = token;
		user.google.name = profile.displayName;
		user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email
		
		user.save(function(err) {
			if(err){
				return done(err);
			}
			done(null, user);
		});
	}
	
	// check if the user is already logged in
	if(req.user){
		// user already exists and is logged in, we have to link accounts
		var user = req.user;
		user.google.id = profile.id;
		return linkUser(user);
	}
	
	User.findOne({
		'google.id': profile.id
	}, function(err, user) {
		if(err){
			return done(err);
		}
		
		if(!user){
			user = new User();
			user.google.id = profile.id;
		}
		
		if(user.google.token){
			return done(null, user);
		}
		
		linkUser(user);
	});
});