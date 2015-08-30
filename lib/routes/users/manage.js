var User = require('../../models/user');

exports.get = function(req, res, next){
	User.find(function(err, users){
		if(err){
			return next(err);
		}
		res.render('users/manage', {
			users: users
		});
	});
};
