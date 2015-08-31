
module.exports = require('../crud/remove')({
	view: 'comities/remove',
	model: require('../../models/comity'),
	successUrl: '/comities/manage'
});
