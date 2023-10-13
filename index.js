import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { db } from './database/database.js';
import Message from './model/messageModel.js';
import cookieParser from 'cookie-parser';

const app = express();

db.then(() => {
    console.log('connected')
}).catch();

//middlewares (use)
app.use(express.static(path.join(path.resolve(), 'public')));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.set('view engine', 'ejs')


const isAuthenticated = (req, res, next) => {
    const { token } = req.cookies;

    if (token) next();     // next mekes sure to go to the next handler where the isAuthenticated handler is used
    else res.render('login');
}

app.get('/', isAuthenticated, (req, res) => {

    const { token } = req.cookies;
    console.log(req.cookies);  // gives undefined without cookie parser package

    // this is to check if the user is authenticated

    // if (token) res.render('logout');

    // else res.render('login');

    // this can be used as a middleware as well -> authentication handler

    res.render('logout');
});

app.post('/contact', async (req, res) => {

    const { name, email } = req.body

    await Message.create({ name, email });

    res.redirect('/success');
});

app.post('/login', (req, res) => {
    // res.cookie('token', 'cookieToken');
    res.cookie('token', 'cookieToken', {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000)
    });
    res.redirect('/');
})

app.get('/logout', (req, res) => {
    res.cookie('token', null, {
        httpOnly: true,
        expires: new Date(Date.now())
    });
    res.redirect('/');
})

app.get('/success', (req, res) => {
    res.send('successfully added the message');
})

//listen to server
app.listen(5000, () => {
    console.log('server is running at 5000');
})