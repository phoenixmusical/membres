
module.exports = require('../crud/create')({
	view: 'events/create',
	model: require('../../models/event'),
	allowedProperties: ['name', 'description', 'start', 'end', 'comity'],
	successRedirect: '/events/manage',
	preLoad: require('./_form-data')
});
