var baseUrl = require('s-conf').require('base_url');

module.exports = require('../crud/update')({
	view: 'comities/update',
	model: require('../../models/comity'),
	allowedProperties: ['name'],
	successRedirect: baseUrl+'comities/manage'
});
