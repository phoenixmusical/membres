
module.exports = require('../crud/update')({
	view: 'users/update',
	model: require('../../models/user'),
	allowedProperties: ['email', 'name', 'isAdmin'],
	successRedirect: '/users/manage'
});
