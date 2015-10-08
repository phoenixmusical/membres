var baseUrl = require('s-conf').require('base_url');

module.exports = require('../crud/create')({
	view: 'users/create',
	model: require('../../models/user'),
	allowedProperties: ['name', 'email', 'isAdmin', 'passwordChangeRequired'],
	successRedirect: baseUrl+'users/manage'
});
