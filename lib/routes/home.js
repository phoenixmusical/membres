var Calendar = require('../utils/calendar');
var Post = require('../models/post');

function generateCalendar(req, callback){
	var month = req.query.month ? parseInt(req.query.month) : (new Date()).getMonth();
	var year = req.query.year ? parseInt(req.query.year) : (new Date()).getFullYear();
	Calendar.create(year, month, callback);
}

function fetchRecentPosts(callback){
	Post.find()
		.sort({importance: 1, dateUpdated: -1})
		.limit(10)
		.exec(callback);
}

exports.get = function(req, res, next){
	generateCalendar(req, function(err, calendar){
		if(err){
			return next(err);
		}
		fetchRecentPosts(function(err, posts){
			if(err){
				return next(err);
			}
			res.render('home', {
				calendar: calendar,
				posts: posts
			});
		});
	});
};
