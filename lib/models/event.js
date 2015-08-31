var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var EventSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true
	},
	description: String,
	start: Number,
	end: Number,
	comity: {
		type: ObjectId,
		ref: 'Comity'
	},
	creator: {
		type: ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('Event', EventSchema);
