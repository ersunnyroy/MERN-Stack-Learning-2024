// during the initilize of this chapter 
// we have installed nodemon globally using : npm i nodemon -g 

const { format } = require('date-fns'); // imported date function module
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    console.log(logItem);

    try {
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }

        await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem);
    } catch (err) {
        console.error(err);
    }
}


console.log(format(new Date, 'yyyyMMdd\tHH:mm:ss'));
console.log("uniqueid:", uuid());

module.exports = logEvents;