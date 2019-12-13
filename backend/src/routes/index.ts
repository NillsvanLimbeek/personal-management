import express from 'express';
const router = express.Router();

import { catchErrors } from '../handlers/ErrorHandlers';
import { getTasks, getTask, saveTask, editTask, deleteTask } from '../controllers/TaskController';

// sections

// tasks
router.get('/tasks', catchErrors(getTasks));
router.get('/tasks/:id', catchErrors(getTask));

router.post('/tasks', catchErrors(saveTask));

router.put('/tasks/:id', catchErrors(editTask));

router.delete('/tasks/:id', catchErrors(deleteTask))

// comments

export default router;
