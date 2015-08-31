
module.exports = require('../crud/update')({
	view: 'events/update',
	model: require('../../models/event'),
	allowedProperties: ['name', 'description', 'start', 'end', 'comity'],
	successRedirect: '/events/manage',
	preLoad: require('./_form-data')
});