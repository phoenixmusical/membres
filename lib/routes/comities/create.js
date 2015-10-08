var baseUrl = require('s-conf').require('base_url');

module.exports = require('../crud/create')({
	view: 'comities/create',
	model: require('../../models/comity'),
	allowedProperties: ['name'],
	successRedirect: baseUrl+'comities/manage'
});
