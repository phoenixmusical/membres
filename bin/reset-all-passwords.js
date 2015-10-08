var mongoose = require('mongoose');
var config = require('s-conf');
var Q = require('q');
var User = require('../lib/models/user');

if(process.argv.length < 4){
	console.error("arguments missing");
	process.exit(1);
}

mongoose.connect(config.require('db'));

var password = process.argv[3];

function changePassword(user){
	console.log('change password for %s', user.email);
	var deferred = Q.defer();
	user.setPassword(password, function(err){
		if(err) return deferred.reject(err);
		user.passwordChangeRequired = true;
		user.save(function(err){
			if(err) return deferred.reject(err);
			deferred.resolve();
		});
	});
	return deferred.promise;
}

Q()
	.then(function(){
		return User.find().exec();
	})
	.then(function(users){
		return users.reduce(function(promise, user){
			return promise.then(function(){
				return changePassword(user);
			});
		}, Q());
	})
	.done(function(){
		process.exit(0);
	});

