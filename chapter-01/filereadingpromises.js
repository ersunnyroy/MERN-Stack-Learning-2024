// file reading with promises to avoid call back hell 
const fs = require('fs'); // importing normal file system module
const path = require('path'); // importing path module

const fsPromises = require('fs').promises; // file system module with promises


// // first we will read file using normal file system and write as well in callback
// // overwrites the file data
// fs.appendFile(path.join(__dirname, 'files', 'appendFile.txt'), 'New file appended', err => {
//     if (err) throw err;
//     console.log("File data append successful");

//     // on success of above writing call back new writing function
//     fs.appendFile(path.join(__dirname, 'files', 'appendFile.txt'), '\n\nSome more text added into file with callback', err => {
//         if (err) throw err;
//         console.log('callback writing completed');

//         // on success of second write rename the file from appendFile.txt to renamedFile.txt
//         fs.rename(path.join(__dirname, 'files', 'appendFile.txt'), path.join(__dirname, 'files', 'renamedFile.txt'), err => {
//             if (err) throw err;
//             console.log("File renamed successfully");
//         })
//     })
// });


// The above type of calling is a mess to make the process sequential one after another so we use fs promises to make the code clean 

const fileOps = async () => {
        try{
            const data = await fsPromises.readFile(path.join(__dirname, 'files', 'newfile.txt'), 'utf8');
            console.log(data);

            await fsPromises.unlink(path.join(__dirname, 'files', 'newfile.txt'));
            console.log('file deleted succesfully');

            await fsPromises.appendFile(path.join(__dirname, 'files', 'undoDeleted.txt'), data);
            console.log('File recovered with new name');

        } catch(error) {
            console.log(error);
        }
}

fileOps();