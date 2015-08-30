
module.exports = require('../crud/remove')({
	view: 'users/remove',
	model: require('../../models/user'),
	successUrl: '/users/manage'
});
