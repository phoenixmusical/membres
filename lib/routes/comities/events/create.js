var Comity = require('../../../models/comity');
var Event = require('../../../models/event');
var dateFormatter = require('../../../utils/date-formatter');
var baseUrl = require('s-conf').require('base_url');

var allowedProperties = ['name', 'description', 'start', 'end'];

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
			var event = new Event();
			event.comity = comity._id;
			event.creator = req.user.id;
			return {
				event: event,
				comity: comity,
				dateFormatter: dateFormatter
			};
		});
}

exports.get = function(req, res, next){
	getData(req)
		.then(function(data){
			data.errors = emptyErrors;
			res.renderMain('comities/events/create', data, next);
		}, next);
};

exports.post = function(req, res, next){
	var data;
	getData(req)
		.then(function(d){
			data = d;
			var event = data.event;
			allowedProperties.forEach(function(property){
				event[property] = req.body[property];
			});
			return event.save();
		})
		.then(function(){
			res.redirect(baseUrl+'comities/'+data.comity.id);
		}, function(err){
			if(err.name !== 'ValidationError' || !err.errors){
				return next(err);
			}
			data.errors = getErrors(err.errors);
			res.renderMain('comities/events/create', data, next);
		});
};
