const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	user: {
		type: String,
		required: true,
	},
	time: {
		type: Date,
	},
	lifetime: {
		type: Boolean,
		default: false,
	},
	expired: {
		type: Boolean,
		default: false,
	}
});

module.exports = mongoose.model('Subscription', schema);
