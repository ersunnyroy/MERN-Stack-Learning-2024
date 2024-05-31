const fs = require('fs') // importing file system module 

const path = require('path'); // importing path module 

// reading the file from the path buffer response and string
fs.readFile('./files/newfile.txt', (err, data) => {
    if (err) throw err;

    console.log(data); // this will console buffer
    console.log(data.toString()) // this will console the string in the file;
});

// reading file in string response avoid using .toString(), you need to pass a param data encoding type utf8 
fs.readFile('./files/newfile.txt', 'utf8', (err, data) => {
    if (err) throw err;

    console.log(data);
});

// reading file using path module it makes the path dynamic we do not require to absolute path anymore now.

fs.readFile(path.join(__dirname, 'files', 'newfile.txt'), 'utf8', (err, data) => {
    if(err) throw err;
    console.log("read file using path data : ", data);
});

// it outputs the path to till the files i.e.  C:\wamp64\www\Node-Js-Learning---2024\files
console.log(path.join(__dirname, 'files'));
