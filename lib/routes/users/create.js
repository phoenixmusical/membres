
module.exports = require('../crud/create')({
	view: 'users/create',
	model: require('../../models/user'),
	allowedProperties: ['name', 'email', 'isAdmin', 'passwordChangeRequired'],
	successRedirect: '/users/manage'
});
