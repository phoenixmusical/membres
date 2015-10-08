var mongoose = require('mongoose');
var config = require('s-conf');
var User = require('../lib/models/user');

if(process.argv.length < 5){
	console.error("arguments missing");
	process.exit(1);
}

mongoose.connect(config.require('db'));

var email = process.argv[3];
var password = process.argv[4];

User.findOne({email: email}, function(err, user){
	if(err) throw err;
	if(!user) throw new Error("user not found");
	user.setPassword(password, function(err){
		if(err) throw err;
		user.save(function(err){
			if(err) throw err;
			console.log("done");
			process.exit(0);
		});
	});
});

