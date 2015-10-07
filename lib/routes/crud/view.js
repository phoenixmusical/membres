var loadModel = require('./load-model');

module.exports = function(options){
	var Model = options.model;
	var view = options.view;
	
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
			loadModel(Model, req, function(err, model){
				if(err){
					return next(err);
				}
				renderView(res, next, {
					model: model
				});
			});
		}
	};
};
