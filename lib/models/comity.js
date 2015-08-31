var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var ComitySchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true
	},
	description: String,
	members: [{
		type: ObjectId,
		ref: 'User'
	}],
	creator: {
		type: ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('Comity', ComitySchema);
