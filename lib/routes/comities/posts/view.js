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
			})
				.populate('items.author')
				.exec();
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
			res.renderMain('comities/posts/view', data, next);
		}, next);
};

exports.post = function(req, res, next){
	if(req.body.type !== 'comment'){
		return next(new Error("Invalid item type"));
	}
	getData(req)
		.then(function(data){
			var post = data.post;
			post.items.push({
				item_type: req.body.type,
				content: req.body.content,
				author: req.user.id,
				date: Date.now()
			});
			post.dateUpdated = Date.now();
			return post.save();
		})
		.then(function(){
			res.redirect(req.url);
		}, next);
};