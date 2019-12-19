import express from 'express';
import bodyParser from 'body-parser';

import { resolve } from 'path';
import { config } from 'dotenv';

const tasks = require('./routes/tasks');
const tasksections = require('./routes/tasksections');
const comments = require('./routes/comments');

const app = express();

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use('/tasks', tasks);
app.use('/tasksections', tasksections);
app.use('/comments', comments);

export default app;
