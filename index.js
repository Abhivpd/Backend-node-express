import http from 'http';
import fs from 'fs';

// const home = fs.readFile('./index.html', () => {
//     console.log('File read')
// })
// console.log(home);   // undefined
// read file is asynchronous


const home = fs.readFileSync('index.html')  //synchronous handling of read file

const server = http.createServer((req, res) => {
    if (req.url === '/about') res.end('<h1>About Page</h1>')
    else if (req.url === '/contact') res.end('<h1>Contact Page</h1>')
    // else if (req.url === '/') {
    //     fs.readFile('./index.html', (error, home) => {           -> async way to handle readfile
    //         res.end(home);
    //     })
    // }  
    else if (req.url === '/') res.end(home)
    else res.end('<h1>Page Not Found</h1>')
    // these if else are to check the urls if we need to check the methods and other stuffs then the code will be large
});

server.listen(5000, () => {
    console.log('server is running at 5000')
})