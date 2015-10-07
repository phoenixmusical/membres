var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var PostSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true
	},
	importance: Number,
	comity: {
		type: ObjectId,
		ref: 'Comity'
	},
	creator: {
		type: ObjectId,
		ref: 'User'
	},
	dateCreated: {
		type: Date,
		'default': Date.now
	},
	dateUpdated: {
		type: Date,
		'default': Date.now
	},
	items: [{
		item_type: String,
		content: String,
		author: {
			type: ObjectId,
			ref: 'User'
		},
		date: Date
	}]
});

module.exports = mongoose.model('Post', PostSchema);
