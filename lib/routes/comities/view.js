var Calendar = require('../../utils/calendar');
var Comity = require('../../models/comity');
var Post = require('../../models/post');
var dateFormatter = require('../../utils/date-formatter');

function generateCalendar(req){
	var month = req.query.month ? parseInt(req.query.month)-1 : (new Date()).getMonth();
	var year = req.query.year ? parseInt(req.query.year) : (new Date()).getFullYear();
	return Calendar.create(year, month, {
		comity: req.params.id
	});
}

function fetchComity(req){
	return Comity.findOne({
		_id: req.params.id
	}).exec();
}

function fetchPosts(req){
	return Post.find({
		comity: req.params.id
	})
		.sort({
			importance: 1,
			dateUpdated: -1
		})
		.limit(10)
		.exec();
}

exports.get = function(req, res, next){
	var data = {};
	fetchComity(req)
		.then(function(comity){
			data.comity = comity;
			return fetchPosts(req);
		})
		.then(function(posts){
			data.posts = posts;
			return generateCalendar(req);
		})
		.then(function(calendar){
			data.calendar = calendar;
			data.dateFormatter = dateFormatter;
			res.renderMain('comities/view', data, next);
		}, next);
};
