const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;
const cors = require('cors');

const { logger } = require('./middleware/logEvents');
const  errorHandler  = require('./middleware/errorHandler');

// built in middleware to handle urlencoded data
// in other words form-data
// 'content-type': 'application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built in middleware for handling json data 
app.use(express.json());

// third party middleware 

// built in middleware for serving static files
// we have to mode all the public files inside public directory
app.use(express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/employees'));



app.use(logger);

// third party cors middleware // CROSS ORIGIN RESOURCE SHARING

// whitelisting domains limited 
const whitelist = ["https://www.google.com", "http://localhost:5000", "http://localhost:3500"];

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));



// route handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log(`Attempted to load hello.html`);
    next();
}, (req, res) => {
    res.send('Hello World From Next Function');
});


// chaining route handlers
const one = (req, res, next) => {
    console.log('One');
    next();
}

const two = (req, res, next) => {
    console.log('two');
    next();
}

const three = (req, res, next) => {
    console.log('three');
    res.send('Finished!');
}


app.get('/chain(.html)?', [one, two, three]);

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});


app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on PORT : ${PORT}`));