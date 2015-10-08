var Comity = require('../../../models/comity');
var Post = require('../../../models/post');
var baseUrl = require('s-conf').require('base_url');

var allowedProperties = ['name'];

function getErrors(errors){
	var errors2 = {};
	allowedProperties.forEach(function(property){
		errors2[property] = errors[property] || "";
	});
	return errors2;
}

var emptyErrors = getErrors({});

function getData(req){
	return Comity.findOne({
		_id: req.params.comity
	})
		.exec()
		.then(function(comity){
			var post = new Post();
			post.comity = comity._id;
			post.creator = req.user.id;
			return {
				post: post,
				comity: comity
			};
		});
}

exports.get = function(req, res, next){
	getData(req)
		.then(function(data){
			data.errors = emptyErrors;
			res.renderMain('comities/posts/create', data, next);
		}, next);
};

exports.post = function(req, res, next){
	var data;
	getData(req)
		.then(function(d){
			data = d;
			var post = data.post;
			allowedProperties.forEach(function(property){
				post[property] = req.body[property];
			});
			return post.save();
		})
		.then(function(){
			res.redirect(baseUrl+'comities/'+data.comity.id+'/posts/'+data.post.id);
		}, function(err){
			if(err.name !== 'ValidationError' || !err.errors){
				return next(err);
			}
			data.errors = getErrors(err.errors);
			res.renderMain('comities/posts/create', data, next);
		});
};
