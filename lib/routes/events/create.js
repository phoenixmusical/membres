var baseUrl = require('s-conf').require('base_url');

module.exports = require('../crud/create')({
	view: 'events/create',
	model: require('../../models/event'),
	allowedProperties: ['name', 'description', 'start', 'end', 'comity'],
	successRedirect: baseUrl+'events/manage',
	preLoad: require('./_form-data')
});
