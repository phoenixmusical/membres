var Calendar = require('../utils/calendar');
var Post = require('../models/post');
var Comity = require('../models/comity');
var dateFormatter = require('../utils/date-formatter');

function generateCalendar(req){
	var month = req.query.month ? parseInt(req.query.month) : (new Date()).getMonth();
	var year = req.query.year ? parseInt(req.query.year) : (new Date()).getFullYear();
	return Calendar.create(year, month, {});
}

function fetchRecentPosts(req){
	return Post.find()
		.sort({importance: 1, dateUpdated: -1})
		.limit(10)
		.exec();
}

exports.get = function(req, res, next){
	var data = {};
	generateCalendar(req)
		.then(function(calendar){
			data.calendar = calendar;
			return fetchRecentPosts(req);
		})
		.then(function(posts){
			data.posts = posts;
			data.dateFormatter = dateFormatter;
			res.renderMain('home', data, next);
		}, next);
};
