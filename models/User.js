const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	user: {
		type: String,
		required: true,
	},
	wallet: {
		type: String,
		required: true,
	},
	plants: [
		{
			id: String,
			time: Date,
		},
	],
});

module.exports = mongoose.model('User', schema);
