
exports.get = function(req, res, next){
	res.renderMain('profile', {}, next);
};
