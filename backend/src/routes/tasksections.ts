import express from 'express';
const router = express.Router();

import { catchErrors } from '../handlers/ErrorHandlers';
import {
    getTaskSections,
    getTaskSection,
    saveTaskSection,
    editTaskSection,
    deleteTaskSection,
} from '../controllers/TaskSectionController';

router.get('/', catchErrors(getTaskSections));
router.get('/:id', catchErrors(getTaskSection));

router.post('/', catchErrors(saveTaskSection));

router.put('/:id', catchErrors(editTaskSection));

router.delete('/:id', catchErrors(deleteTaskSection));

module.exports = router;
