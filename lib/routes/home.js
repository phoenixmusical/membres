var Calendar = require('calendar').Calendar;
var Event = require('../models/event');

var firstYear = 2014;
var calendar = new Calendar(0);
var monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

function IndexedCollection(){
	var map = {};
	return {
		get: function(index){
			return map[index] || [];
		},
		add: function(index, item){
			if(map[index]){
				map[index].push(item);
			}else{
				map[index] = [item];
			}
		}
	};
}

function fetchEventsMap(year, month, callback){
	Event.find({
		
	}, function(err, events){
		if(err){
			return callback(err);
		}
		var eventsMap = IndexedCollection();
		events.forEach(function(event){
			var day = event.start.getDate();
			eventsMap.add(day, event);
		});
		callback(null, eventsMap);
	});
}

exports.get = function(req, res, next){
	var month = req.query.month ? parseInt(req.query.month) : (new Date()).getMonth();
	if(month < 0 || month > 11){
		throw new Error("Invalid month");
	}
	var year = req.query.year ? parseInt(req.query.year) : (new Date()).getFullYear();
	if(year < firstYear){
		throw new Error("Invalid year");
	}
	fetchEventsMap(year, month, function(err, eventsMap){
		if(err){
			return next(err);
		}
		var weeks = calendar.monthDays(year, month).map(function(week){
			return week.map(function(day){
				return {
					number: day || "",
					events: eventsMap.get(day)
				};
			});
		});
		console.log(weeks);
		res.render('home', {
			monthName: monthNames[month],
			year: year,
			weeks: weeks
		});
	});
};
