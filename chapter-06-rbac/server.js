require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 3500;
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const ConnectDB = require('./config/dbCon');

ConnectDB();

mongoose.connection.once('open', () => {
    console.log('DB connection open, starting server...');
    app.listen(PORT, () => console.log(`Server is running on PORT : ${PORT}`));
});

// Additional error handling for mongoose connection
mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
});


// middlewares
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const credentials = require('./middleware/credentials');

//config
const { corsOptions } = require('./config/corsOptions.js');

// built in middleware to handle urlencoded data
// in other words form-data
// 'content-type': 'application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built in middleware for handling json data 
app.use(express.json());
app.use(cookieParser());

// third party middleware 

// built in middleware for serving static files
// we have to mode all the public files inside public directory
app.use(express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/register', require('./routes/api/register'));
app.use('/login', require('./routes/api/login'));
app.use('/logout', require('./routes/api/logout'));
app.use('/refresh', require('./routes/api/refresh'));
app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));
app.use(logger);

// third party cors middleware // CROSS ORIGIN RESOURCE SHARING
app.use(credentials);
app.use(cors(corsOptions));
app.use(errorHandler);