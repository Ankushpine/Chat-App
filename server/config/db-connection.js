const mongoose = require('mongoose');
require('dotenv').config();

// module.exports = mongoose.connect(process.env.MONGO_DB_URL)
// .then(() => console.log('Connected to database!'))
// .catch((error)=>{console.log("Error in connecting DB" ,error.message);})

const connectToMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DB_URL);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

module.exports = connectToMongoDB;