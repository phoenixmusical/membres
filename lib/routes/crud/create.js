var saveModel = require('./save-model');

module.exports = function(options){
	var Model = options.model;
	var view = options.view;
	
	var emptyErrors = {};
	options.allowedProperties.forEach(function(property){
		emptyErrors[property] = "";
	});
	
	return {
		get: function(req, res, next){
			res.render(view, {
				errors: emptyErrors
			});
		},
		post: function(req, res, next){
			var model = new Model();
			saveModel(model, options, req, res, next);
		}
	};
};
