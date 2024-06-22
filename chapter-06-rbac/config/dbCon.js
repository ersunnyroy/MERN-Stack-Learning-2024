const mongoose = require('mongoose');
const ConnectDB = mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch((error) => {
    console.error(`Error connecting to database ${error}`);
});

module.exports = ConnectDB;

