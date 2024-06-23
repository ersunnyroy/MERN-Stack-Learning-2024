require('dotenv').config();
const mongoose = require('mongoose');
const ConnectDB = async () => {
    try {
        // console.log(process.env.DATABASE_URI);
        await mongoose.connect(process.env.DATABASE_URI);
        // console.log('DB connected');
    } catch (error) {
        // console.error('DB connection error:', error);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = ConnectDB;