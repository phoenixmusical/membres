var Comity = require('../../models/comity');

exports.get = function(req, res, next){
	Comity.findOne({
		_id: req.params.id
	})
		.exec()
		.then(function(comity){
			res.renderMain('comities/view', {
				comity: comity
			}, next);
		}, next);
};
