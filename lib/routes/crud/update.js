var loadModel = require('./load-model');
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
			loadModel(Model, req, function(err, model){
				if(err){
					return next(err);
				}
				res.render(view, {
					model: model,
					errors: emptyErrors
				});
			});
		},
		post: function(req, res, next){
			loadModel(Model, req, function(err, model){
				if(err){
					return next(err);
				}
				saveModel(model, options, req, res, next);
			});
		}
	};
};
