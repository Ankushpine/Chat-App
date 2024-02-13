const mongoose = require('mongoose');
require('dotenv').config();

module.exports = mongoose.connect(process.env.MONGO_DB_URL)
.then(() => console.log('Connected to database!'))
.catch(()=>{console.log("Error in connecting DB");})

