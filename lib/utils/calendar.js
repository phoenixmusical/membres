var Calendar = require('calendar').Calendar;
var Event = require('../models/event');
var IndexedCollection = require('./indexed-collection');

var firstYear = 2014;
var calendar = new Calendar(0);
var monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

function fetchEventsMap(filter){
	return Event.find(filter)
		.then(function(events){
			var eventsMap = IndexedCollection();
			events.forEach(function(event){
				var day = event.start.getDate();
				eventsMap.add(day, event);
			});
			return eventsMap;
		});
}

function getDateRange(year, month){
	var endMonth = month + 1;
	var endYear = year;
	if(endMonth > 12){
		endMonth -= 12;
		endYear++;
	}
	return {
		start: new Date(year, month, 1, 0, 0, 0, 0),
		end: new Date(endYear, endMonth, 1, 23, 59, 59, 0)
	};
}

exports.create = function(year, month, filter){
	if(month < 0 || month > 11){
		throw new Error("Invalid month");
	}
	if(year < firstYear){
		throw new Error("Invalid year");
	}
	
	var range = getDateRange(year, month);
	filter.start = {
		$gt: range.start,
		$lt: range.end
	};
	return fetchEventsMap(filter)
		.then(function(eventsMap){
			var weeks = calendar.monthDays(year, month).map(function(week){
				return week.map(function(day){
					return {
						number: day || "",
						events: eventsMap.get(day)
					};
				});
			});
			return {
				monthName: monthNames[month],
				month: month+1,
				year: year,
				weeks: weeks
			};
		});
};
