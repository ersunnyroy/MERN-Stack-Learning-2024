const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

// built in middleware to handle urlencoded data
// in other words form-data
// 'content-type': 'application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built in middleware for handling json data 
app.use(express.json());

// built in middleware for serving static files
app.use(express.static(path.join(__dirname, '/public')));

// regex to make the route work with only /  or only index or index.html in url
app.get('^/$|/index(.html)?', (req, res) => {
    // All three ways to send response and response with file 

    // res.send('Hello World! From Sunny Roy');
    // res.sendFile('./views/index.html', {root: __dirname});
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page');
});


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

app.listen(PORT, () => console.log(`Server is running on PORT : ${PORT}`));