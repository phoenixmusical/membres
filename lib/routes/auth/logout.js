
exports.allowAnonymous = true;

exports.get = function(req, res){
	req.logout();
	res.redirect('/login');
};