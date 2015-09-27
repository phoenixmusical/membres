var Comity = require('../../models/comity');
var dateFormatter = require('../../utils/date-formatter');

module.exports = function(data, callback){
	Comity.find(function(err, comities){
		if(err){
			return callback(err);
		}
		data.dateFormatter = dateFormatter;
		data.comities = comities;
		callback();
	});
};
