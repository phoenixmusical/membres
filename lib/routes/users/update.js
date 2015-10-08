var baseUrl = require('s-conf').require('base_url');

module.exports = require('../crud/update')({
	view: 'users/update',
	model: require('../../models/user'),
	allowedProperties: ['name', 'email', 'isAdmin', 'passwordChangeRequired'],
	successRedirect: baseUrl+'users/manage'
});
