// Module is for file writing but in chunks a large file 

const fs = require('fs');
const path = require('path');

const reader = fs.createReadStream(path.join(__dirname, 'files', 'big.txt'));

const writer = fs.createWriteStream(path.join(__dirname, 'files', 'bigNew.txt'));


// so this will write the file on event data in chunks 
/*
reader.on('data', dataChunk => {
    writer.write(dataChunk);
    console.log('writing');
});
*/

// on place of data event on reader we can use pipe its better and in single line code performs the same thing
reader.pipe(writer);