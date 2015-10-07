var Comity = require('./models/comity');

module.exports = function(req, res, outerNext){
	res.renderMain = function(view, data, next){
		data = data || {};
		Comity.find()
			.exec()
			.then(function(comities){
				data.comities = comities;
				res.render(view, data);
			}, next);
	};
	outerNext();
};
