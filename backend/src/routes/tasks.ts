import express from 'express';
const router = express.Router();

import { catchErrors } from '../handlers/ErrorHandlers';
import {
    getTasks,
    getTask,
    saveTask,
    editTask,
    deleteTask,
} from '../controllers/TaskController';

router.get('/', catchErrors(getTasks));
router.get('/:id', catchErrors(getTask));

router.post('/', catchErrors(saveTask));

router.put('/:id', catchErrors(editTask));

router.delete('/:id', catchErrors(deleteTask));

module.exports = router;
