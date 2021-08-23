const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config');

mongoose
	.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log(`📁 Database successfully connected [${mongoose.connection.db.databaseName}]`));

mongoose.Promise = global.Promise;

mongoose.connection.on('error', console.error.bind(console, '❌ Error connecting to database'));

module.exports = mongoose;
