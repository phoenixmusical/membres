var baseUrl = require('s-conf').require('base_url');

module.exports = require('../crud/remove')({
	view: 'comities/remove',
	model: require('../../models/comity'),
	successUrl: baseUrl+'comities/manage'
});
