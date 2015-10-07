
module.exports = require('../crud/update')({
	view: 'users/update',
	model: require('../../models/user'),
	allowedProperties: ['name', 'email', 'isAdmin', 'passwordChangeRequired'],
	successRedirect: '/users/manage'
});
