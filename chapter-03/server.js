const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;
const logEvents = require('./logEvents');
const EventEmitter = require('events');

class Emitter extends EventEmitter { };
const myEmitter = new Emitter();

// event handling 
myEmitter.on('log', (msg, logFileName) => logEvents(msg, logFileName));
// server port
const PORT = process.env.PORT || 3500;

// function to serve files 

const serverFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromises.readFile(filePath,
            !contentType.includes('image') ? 'utf8' : ''
        );
        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;
        response.writeHead(
            filePath.includes('404') ? 404 : 200,
            { 'Content-Type': contentType });
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );
    } catch (error) {
        console.log(error);
        myEmitter.emit('log', `${error.name}: ${error.message} at ${error.line}`, 'errorLog.txt');
        response.statusCode = 500;
        response.end();
    }
}

// create server
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');

    let filePath;

    // static if else condition for single route
    if (req.url === '/' || req.url === 'index.html') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        filePath = path.join(__dirname, 'views', 'index.html');
        fs.readFil(filePath, 'utf8', (err, data) => {
            res.end(data);
        });
    }

    // for making it even more better we can use switch 
    const extension = path.extname(req.url);

    // on based of extension lets make dynamic response content type
    let contentType;
    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'text/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }

    filePath = contentType === 'text/html' && req.url === '/'
        ? path.join(__dirname, 'views', 'index.html')
        : contentType === 'text/html' && req.url === 'index.html'
            ? path.join(__dir, 'views', 'index.html')
            : contentType === 'text/html'
                ? path.join(__dirname, 'views', req.url)
                : path.join(__dirname, req.url);

    // if not index or root path then to make .html not required in url 
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';
    console.log('File Path : ', filePath);
    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        // server the file
        serverFile(filePath, contentType, res);
    } else {
        // 301 or 404 response
        console.log(path.parse(filePath));
        switch (path.parse(filePath).base) {
            case 'old-page.html':
                res.statusCode = 301;
                res.writeHead(res.statusCode, { 'Location': '/new-page.html' });
                res.end();
                break;
            case 'www-page.html':
                res.statusCode = 301;
                res.writeHead(res.statusCode, { 'Location': '/' });
                res.end();
                break;
            default:
                serverFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
                break;
        }
    }

    switch (req.url) {

        case '/':
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            filePath = path.join(__dirname, 'views', 'index.html');
            fs.readFile(filePath, 'utf8', (err, data) => {
                res.end(data);
            });
            break;
        case 'old-file.html':
            res.statusCode = 301;
            res.writeHead('Location :')
    }

});

// server listen code
server.listen(PORT, () => console.log(`Server is running on PORT : ${PORT}`));