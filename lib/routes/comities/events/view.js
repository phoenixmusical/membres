var Comity = require('../../../models/comity');
var Event = require('../../../models/event');
var dateFormatter = require('../../../utils/date-formatter');

function getData(req){
	var data = {};
	return Comity.findOne({
		_id: req.params.comity
	}).exec()
		.then(function(comity){
			if(!comity){
				throw new Error("Not found");
			}
			data.comity = comity;
			return Event.findOne({
				_id: req.params.event,
				comity: comity._id
			}).exec();
		})
		.then(function(event){
			if(!event){
				throw new Error("Not found");
			}
			data.event = event;
			data.dateFormatter = dateFormatter;
			return data;
		});
}

exports.get = function(req, res, next){
	getData(req)
		.then(function(data){
			res.renderMain('comities/events/view', data, next);
		}, next);
};
