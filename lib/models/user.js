var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
	email: String,
	name: {
		type: String,
		default: ""
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	local: {
		passhash: String
	},
	facebook: {
		id: String,
		token: String
	},
	google: {
		id: String,
		token: String
	}
});

UserSchema.methods.setPassword = function(password, callback){
	var self = this;
    bcrypt.hash(password, null, null, function(err, hash){
    	if(err){
    		return callback(err);
    	}
    	self.local.passhash = hash;
    	callback(null);
    });
};

UserSchema.methods.validatePassword = function(password, callback){
    bcrypt.compare(password, this.local.passhash, callback);
};

module.exports = mongoose.model('User', UserSchema);
