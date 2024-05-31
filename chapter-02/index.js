// during the initilize of this chapter 
// we have installed nodemon globally using : npm i nodemon -g 

const { format } = require('date-fns');

console.log(format(new Date, 'yyyyMMdd\tHH:mm:ss'))