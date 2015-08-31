var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var PostSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true
	},
	comity: {
		type: ObjectId,
		ref: 'Comity'
	},
	creator: {
		type: ObjectId,
		ref: 'User'
	},
	date: {
		type: Date,
		'default': Date.now
	},
	items: [{
		item_type: String,
		content: String,
		importance: Number,
		author: {
			type: ObjectId,
			ref: 'User'
		}
	}]
});

module.exports = mongoose.model('Post', PostSchema);
