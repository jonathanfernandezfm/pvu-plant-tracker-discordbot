const mongoose = require('mongoose');

const schema = new mongoose.Schema({
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
});

module.exports = mongoose.model('Plant', schema);
