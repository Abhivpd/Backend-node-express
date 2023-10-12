import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { db } from './database/database.js';
import Message from './model/messageModel.js';

const app = express();

db.then(() => {
    console.log('connected')
}).catch();

app.use(express.static(path.join(path.resolve(), 'public')));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs')

app.get('/', (req, res) => {

    res.render('index', { name: 'Abhishek' });
});

// app.get('/add', (req, res) => {
//     const messageData = { name: req.body.name, email: req.body.email }
//     console.log(messageData);
//     Message.create({ name: 'Abhishek', email: 'abhishekvpd@gmail.com' })
//         .then(() => {
//             res.send('added the data')
//         })
//         .catch()
// })

app.post('/contact', async (req, res) => {

    const { name, email } = req.body

    await Message.create({ name, email });

    res.redirect('/success')
});

app.get('/success', (req, res) => {
    res.send('successfully added the message');
})

//listen to server
app.listen(5000, () => {
    console.log('server is running at 5000');
})