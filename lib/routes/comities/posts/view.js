var Comity = require('../../../models/comity');
var Post = require('../../../models/post');
var dateFormatter = require('../../../utils/date-formatter');

function getData(req){
	var data = {};
	return Comity.findOne({
		_id: req.params.comity
	}).exec()
		.then(function(comity){
			if(!comity){
				throw new Error("Not found");
			}
			data.comity = comity;
			return Post.findOne({
				_id: req.params.post,
				comity: comity._id
			}).exec();
		})
		.then(function(post){
			if(!post){
				throw new Error("Not found");
			}
			data.post = post;
			data.dateFormatter = dateFormatter;
			return data;
		});
}

exports.get = function(req, res, next){
	getData(req)
		.then(function(data){
			res.renderMain('comities/events/view', data, next);
		}, next);
};
