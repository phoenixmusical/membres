var Calendar = require('../../utils/calendar');
var Comity = require('../../models/comity');
var Post = require('../../models/post');

function generateCalendar(req){
	var month = req.query.month ? parseInt(req.query.month) : (new Date()).getMonth();
	var year = req.query.year ? parseInt(req.query.year) : (new Date()).getFullYear();
	return Calendar.create(year, month, {});
}

function fetchComity(req){
	return Comity.findOne({
		_id: req.params.id
	}).exec();
}

exports.get = function(req, res, next){
	var data = {};
	fetchComity(req)
		.then(function(comity){
			data.comity = comity;
			return generateCalendar(req);
		})
		.then(function(calendar){
			data.calendar = calendar;
			res.renderMain('comities/view', data, next);
		}, next);
};
