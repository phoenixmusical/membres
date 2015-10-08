var baseUrl = require('s-conf').require('base_url');

module.exports = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect(baseUrl+'login');
};