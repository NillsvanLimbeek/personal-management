import express from 'express';
const router = express.Router();

import { catchErrors } from '../handlers/ErrorHandlers';

import { getTasks } from '../controllers/TaskController';

router.get('/', catchErrors(getTasks));

export default router;
