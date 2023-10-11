import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();   // this is the server

// app.get('/', (req, res) => {
//     res.sendStatus(500);
// })

// app.get('/getProducts', (req, res) => {

//     // res.json({
//     //     success: true,
//     //     products: []
//     // })

//     res.status(200).json({
//         success: true,
//         products: ['asasujsdsdsd']
//     })

// })


// app.get('/getProducts', (req, res) => {

//     // res.sendFile('./index.html'); // gives the error -> path must be absolute or specify root to res.sendFile

//     const file = fs.readFileSync('./index.html');
//     res.sendFile(file);  //gives the error -> path must be a string to res.sendFile


//     // need to specify the path

//     // __dirname cannot be used as for that we need to specify the type as the common js

// })


app.get('/', (req, res) => {

    const pathLocation = path.resolve();
    console.log(pathLocation, path.join(pathLocation, 'index.html'));
    res.sendFile(path.join(pathLocation, 'index.html'));

})

//listen to server
app.listen(5000, () => {
    console.log('server is running at 5000');
})