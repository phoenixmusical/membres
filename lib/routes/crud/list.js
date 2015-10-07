
module.exports = function(options){
	var Model = options.model;
	var view = options.view;
	
	return {
		get: function(req, res, next){
			Model.find(options.conditions || {}, function(err, models){
				if(err){
					return next(err);
				}
				res.renderMain(view, {
					models: models
				}, next);
			});
		}
	};
};
