
module.exports = require('../crud/create')({
	view: 'comities/create',
	model: require('../../models/comity'),
	allowedProperties: ['name'],
	successRedirect: '/comities/manage'
});
