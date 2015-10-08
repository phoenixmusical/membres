var Post = require('../../models/post');
var dateFormatter = require('../../utils/date-formatter');

exports.get = function(req, res, next){
	Post.findOne({
		_id: req.params.id
	})
		.populate('items.author')
		.exec()
		.then(function(post){
			res.renderMain('posts/view', {
				dateFormatter: dateFormatter,
				post: post
			}, next);
		}, next);
};

exports.post = function(req, res, next){
	if(req.body.type !== 'comment'){
		return next(new Error("Invalid item type"));
	}
	Post.findOne({
		_id: req.params.id
	})
		.exec()
		.then(function(post){
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