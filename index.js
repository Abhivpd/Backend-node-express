import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import { db } from './database/database.js';
import User from './model/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const app = express();

db.then(() => {
    console.log('connected')
}).catch();

//middlewares (use)
app.use(express.static(path.join(path.resolve(), 'public')));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.set('view engine', 'ejs')


const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;

    if (token) {
        const decodedData = jwt.verify(token, 'jwtSecretKey');

        req.user = await User.findById(decodedData._id);
        next();
    }
    else res.redirect('/login');
}

app.get('/', isAuthenticated, (req, res) => {
    console.log(req.user)
    res.render('logout', { name: req.user.name });
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/logout', (req, res) => {
    res.cookie('token', null, {
        httpOnly: true,
        expires: new Date(Date.now())
    });
    res.redirect('/');
})

app.post('/login', async (req, res) => {

    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
        console.log('Register First');
        return res.redirect('/register');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) return res.render('login', { email, message: 'Incorrect Password' });

    //setting the jwt token

    const token = jwt.sign({ _id: user._id }, 'jwtSecretKey');
    console.log(token);

    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000)
    });
    res.redirect('/');
});

app.post('/register', async (req, res) => {

    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
        console.log('User Already Exists');
        return res.redirect('/login');
    }

    // hashing the password

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });


    //setting the jwt token

    const token = jwt.sign({ _id: user._id }, 'jwtSecretKey');
    console.log(token);

    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000)
    });
    res.redirect('/');
});

//listen to server
app.listen(5000, () => {
    console.log('server is running at 5000');
})