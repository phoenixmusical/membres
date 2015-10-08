var baseUrl = require('s-conf').require('base_url');

module.exports = require('../crud/remove')({
	view: 'events/remove',
	model: require('../../models/event'),
	successUrl: baseUrl+'events/manage'
});
