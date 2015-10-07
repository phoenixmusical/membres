
module.exports = function(options){
	var Model = options.model;
	var view = options.view;
	
	return {
		get: function(req, res, next){
			var query = Model.find(options.conditions || {});
			if(options.sort){
				query.sort(options.sort);
			}
			query.exec(function(err, models){
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
