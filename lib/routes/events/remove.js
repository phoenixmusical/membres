
module.exports = require('../crud/remove')({
	view: 'events/remove',
	model: require('../../models/event'),
	successUrl: '/events/manage'
});
