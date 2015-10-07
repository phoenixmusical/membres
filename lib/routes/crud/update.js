var loadModel = require('./load-model');
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
		res.render(view, data);
	};
	
	return {
		get: function(req, res, next){
			loadModel(Model, req, function(err, model){
				if(err){
					return next(err);
				}
				renderView(res, next, {
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
				saveModel(model, options, renderView, req, res, next);
			});
		}
	};
};
