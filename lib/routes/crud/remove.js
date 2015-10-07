var loadModel = require('./load-model');

module.exports = function(options){
	var Model = options.model;
	var view = options.view;
	var successUrl = options.successUrl;
	
	return {
		get: function(req, res, next){
			loadModel(Model, req, function(err, model){
				if(err){
					return next(err);
				}
				res.renderMain(view, {
					model: model
				}, next);
			});
		},
		post: function(req, res, next){
			loadModel(Model, req, function(err, model){
				if(err){
					return next(err);
				}
				model.remove(function(err){
					if(err){
						return next(err);
					}
					res.redirect(successUrl);
				});
			});
		}
	};
};
