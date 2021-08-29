const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	owner: {
		type: String,
	},
	url: {
		type: String,
	},
	id: {
		type: String,
	},
	id_plant: {
		type: String,
		required: true,
	},
	time: {
		type: Date,
		required: true,
	},
	harvest_time: {
		type: Date,
	},
	coordinate_x: {
		type: String,
		required: true,
	},
	coordinate_y: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	notified: {
		type: Boolean,
	},
	notified_harvest: {
		type: Boolean,
	},
});

module.exports = mongoose.model('Plant', schema);
