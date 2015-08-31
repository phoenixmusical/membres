
module.exports = require('../crud/list')({
	view: 'users/manage',
	model: require('../../models/user')
});
