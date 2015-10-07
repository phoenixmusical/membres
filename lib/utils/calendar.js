var Calendar = require('calendar').Calendar;
var Event = require('../models/event');
var IndexedCollection = require('./indexed-collection');

var firstYear = 2014;
var calendar = new Calendar(0);
var monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

function fetchEventsMap(year, month, filter){
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

exports.create = function(year, month, filter){
	if(month < 0 || month > 11){
		throw new Error("Invalid month");
	}
	if(year < firstYear){
		throw new Error("Invalid year");
	}
	
	return fetchEventsMap(year, month, filter)
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
				year: year,
				weeks: weeks
			};
		});
};
