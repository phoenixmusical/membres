
module.exports = require('../crud/update')({
	view: 'comities/update',
	model: require('../../models/comity'),
	allowedProperties: ['name'],
	successRedirect: '/comities/manage'
});
