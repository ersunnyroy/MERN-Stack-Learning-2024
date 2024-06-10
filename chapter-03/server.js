const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;
const logEvents = require('./logEvents');
const EventEmitter = require('events');

class Emitter extends EventEmitter {};
const myEmitter = new Emitter();

// event handling 
myEmitter.on('log', (msg, logFileName) => logEvents(msg, logFileName));
// server port
const PORT = process.env.PORT || 3500;
console.log(PORT);
// create server
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);  

    let filePath;
    
    if(req.url === '/' || req.url === 'index.html') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        filePath = path.join(__dirname, 'views', 'index.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
            res.end(data);
        });
    }

});

// server listen code
server.listen(PORT, () => console.log(`Server is running on PORT : ${PORT}`));