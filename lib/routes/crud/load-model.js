
module.exports = function(Model, req, callback){
	Model.findOne({
		_id: req.params.id
	}, function(err, model){
		if(err){
			return callback(err);
		}
		if(!model){
			return callback(new Error("Page introuvable"));
		}
		callback(null, model);
	});
};