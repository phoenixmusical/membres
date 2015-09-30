var Calendar = require('calendar').Calendar;
var Event = require('../models/event');
var IndexedCollection = require('./indexed-collection');

var firstYear = 2014;
var calendar = new Calendar(0);
var monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

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

exports.create = function(year, month, callback){
	if(month < 0 || month > 11){
		return callback(new Error("Invalid month"));
	}
	if(year < firstYear){
		return callback(new Error("Invalid year"));
	}
	fetchEventsMap(year, month, function(err, eventsMap){
		if(err){
			return callback(err);
		}
		var weeks = calendar.monthDays(year, month).map(function(week){
			return week.map(function(day){
				return {
					number: day || "",
					events: eventsMap.get(day)
				};
			});
		});
		callback(null, {
			monthName: monthNames[month],
			year: year,
			weeks: weeks
		});
	});
};
