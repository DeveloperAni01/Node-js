const fs  = require('fs') //fs is the package for file

//create file
//sync.... call
// fs.writeFileSync('./text.txt', 'hello!')


//Async Call....
// fs.writeFile('./text.txt', 'hello! async', (error) => {}) // not return 



//read File
/* const result = fs.readFileSync('./Contact.txt', "utf-8") // it returns 

console.log(result) */

//non - blocking code
/* fs.readFile('./Contact.txt', "utf-8", (err, result) => {
    if(err) {
        console.log(`error ${err}`);
    } else {
        console.log(result);
    }
}); */



/* fs.appendFileSync('./Contact.txt', `${Date.now()} \n`) */ // blocking code

// fs.mkdirSync('my-file/a/b', {recursive: true})


const os = require('os')
console.log(os.cpus().length)


/* generally the thread pool size is = 4
but we can extend thread pool size, that is depends on the size of cpu core.
i.e my cpu core size = 16
that mean I can expand thread pool size upto 16
*/