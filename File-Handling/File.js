const fs  = require('fs') //fs is the package for file

//create file
//sync.... call
// fs.writeFileSync('./text.txt', 'hello!')


//Async Call....
// fs.writeFile('./text.txt', 'hello! async', (error) => {}) // not return 



//read File
/* const result = fs.readFileSync('./Contact.txt', "utf-8") // it returns 

console.log(result) */


/* fs.readFile('./Contact.txt', "utf-8", (err, result) => {
    if(err) {
        console.log(`error ${err}`);
    } else {
        console.log(result);
    }
}); */



fs.appendFileSync('./Contact.txt', `${Date.now()} \n`)

// fs.mkdirSync('my-file/a/b', {recursive: true})