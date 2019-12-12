import express from 'express';
import bodyParser from 'body-parser';

import router from './routes';

const app = express();

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use('/', router);

export default app;
