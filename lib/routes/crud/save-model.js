
module.exports = function(model, options, req, res, next){
	var body = req.body;
	var errors = {};
	options.allowedProperties.forEach(function(property){
		model[property] = body[property];
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
		res.render(options.view, {
			model: model,
			errors: errors
		});
	});
};
