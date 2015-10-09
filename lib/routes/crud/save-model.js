
module.exports = function(model, options, renderView, req, res, next){
	var body = req.body;
	var errors = {};
	options.allowedProperties.forEach(function(property){
		if(body[property]){
			model[property] = body[property];
		}
		errors[property] = "";
	});
	model.save(function(err){
		if(!err){
			return res.redirect(options.successRedirect||'back');
		}
		
		if(err.name !== 'ValidationError' || !err.errors){
			return next(err);
		}
		
		for(var key in err.errors){
			errors[key] = err.errors[key];
		}
		renderView(res, next, {
			model: model,
			errors: errors
		});
	});
};
