var baseUrl = require('s-conf').require('base_url');

exports.get = function(req, res){
	req.logout();
	res.redirect(baseUrl);
};