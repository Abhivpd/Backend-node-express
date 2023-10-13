import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { db } from './database/database.js';
import Message from './model/messageModel.js';
import cookieParser from 'cookie-parser';
import User from './model/userModel.js';

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

    if (token) next();
    else res.render('login');
}

app.get('/', isAuthenticated, (req, res) => {
    res.render('logout');
});

app.post('/login', async (req, res) => {

    const { name, email } = req.body;

    const user = await User.create({ name, email });

    res.cookie('token', user._id, {
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

//listen to server
app.listen(5000, () => {
    console.log('server is running at 5000');
})