import express from 'express';
import session from 'express-session';
import router from './routes';

const app = express();

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

app.use('/', router);

app.set('trust proxy', 1);
app.use(
    session({
        secret: process.env.SECRET || 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },
    }),
);

app.listen(3000);
console.log('Server is running');
