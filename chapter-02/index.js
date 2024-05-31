// during the initilize of this chapter 
// we have installed nodemon globally using : npm i nodemon -g 

const { format } = require('date-fns'); // imported date function module

const { v4: uuid } = require('uuid');

console.log(format(new Date, 'yyyyMMdd\tHH:mm:ss'));

console.log("uniqueid:",uuid());