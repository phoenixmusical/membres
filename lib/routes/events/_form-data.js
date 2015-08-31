var Comity = require('../../models/comity');

module.exports = function(data, callback){
	Comity.find(function(err, comities){
		if(err){
			return callback(err);
		}
		data.comities = comities;
		callback();
	});
};
