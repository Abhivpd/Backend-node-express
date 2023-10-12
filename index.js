import express from 'express';
import path from 'path';

const app = express();   // this is the server

// using middlewares

app.use(express.static(path.join(path.resolve(), 'public')));  //with this static files can be served directly (localhost:3000/public.html, localhost:3000/script.js)  only the ones in the folder specified (public in this case)

app.use(express.urlencoded({ extended: true }));   // to parse the data without this the body will be undefined

app.set('view engine', 'ejs')   // setting up the view engine   /// the folder should be named views


// app.get('/', (req, res) => {

//     // to serve static files like css, FE js fileLoader, images or vids etc we have static files

//     res.sendFile('index');

// })

app.get('/', (req, res) => {

    // res.render('index.ejs') //if we set the extension (.ejs) the no need to set up the view engine
    res.render('index', { name: 'Abhishek' });
    //render method is used when we give dynamic data instead of static html

});


const users = [];

app.post('/contact', (req, res) => {
    console.log(req.body);  //gives undefined without urlencoded

    users.push({
        username: req.body.name,
        useremail: req.body.email
    });

    res.redirect('./success')
});

app.get('/success', (req, res) => {
    res.render('success');
})

app.get('/users', (req, res) => {
    res.json({
        users
    })
})

//listen to server
app.listen(5000, () => {
    console.log('server is running at 5000');
})