var config = require('s-conf');

var baseUrl = config.require('base_url');

exports.get = function(req, res, next){
	res.render('auth/changePassword', {
		changeRequired: req.user.passwordChangeRequired
	});
};

exports.post = function(req, res, next){
	function renderError(errorMessage){
		res.render('auth/changePassword', {
			changeRequired: req.user.passwordChangeRequired,
			errorMessage: errorMessage
		});
	}
	var body = req.body;
	var user = req.user;
	if(!body.password){
		return renderError("Le mot de passe est requis");
	}
	if(body.password !== body.password_repeat){
		return renderError("Les mots de passes sont différents");
	}
	user.setPassword(body.password, function(err){
		if(err){
			return next(err);
		}
		user.passwordChangeRequired = false;
		user.save(function(err){
			if(err){
				return next(err);
			}
			res.redirect(baseUrl);
		});
	});
};
