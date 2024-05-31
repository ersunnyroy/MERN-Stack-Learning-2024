// during the initilize of this chapter 
// we have installed nodemon globally using : npm i nodemon -g 

// now we are importing log events module 

const logEvents = require('./logEvents');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

const myEmitter = new MyEmitter();

// event handling 

myEmitter.on('log', (msg) => logEvents(msg));

// emitting a custom log with 2 seconds delay
setTimeout(() => {
    myEmitter.emit('log', 'Logging function worked!');
}, 2000);

const { format } = require('date-fns'); // imported date function module
const { v4: uuid } = require('uuid');
console.log(format(new Date, 'yyyyMMdd\tHH:mm:ss'));
console.log("uniqueid:", uuid());