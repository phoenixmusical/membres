var baseUrl = require('s-conf').require('base_url');

module.exports = require('../crud/remove')({
	view: 'users/remove',
	model: require('../../models/user'),
	successUrl: baseUrl+'users/manage'
});
