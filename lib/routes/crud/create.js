var saveModel = require('./save-model');

module.exports = function(options){
	var Model = options.model;
	var view = options.view;
	
	var emptyErrors = {};
	options.allowedProperties.forEach(function(property){
		emptyErrors[property] = "";
	});
	
	var renderView = options.preLoad ? function(res, next, data){
		options.preLoad(data, function(err){
			if(err){
				return next(err);
			}
			res.renderMain(view, data, next);
		});
	} : function(res, next, data){
		res.renderMain(view, data, next);
	};
	
	return {
		get: function(req, res, next){
			var model = new Model();
			model.creator = req.user;
			options.allowedProperties.forEach(function(property){
				model[property] = "";
			});
			renderView(res, next, {
				model: model,
				errors: emptyErrors
			});
		},
		post: function(req, res, next){
			var model = new Model();
			model.creator = req.user;
			saveModel(model, options, renderView, req, res, next);
		}
	};
};
