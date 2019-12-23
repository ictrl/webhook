require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});
		console.log('connected Mongo');
	} catch (error) {
		console.error(error);
	}
};

module.exports = connectDB;
