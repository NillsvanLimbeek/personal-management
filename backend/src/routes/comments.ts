import express from 'express';
const router = express.Router();

import { catchErrors } from '../handlers/ErrorHandlers';
import {
    getComments,
    getComment,
    saveComment,
    editComment,
    deleteComment,
} from '../controllers/CommentController';

router.get('/', catchErrors(getComments));
router.get('/:id', catchErrors(getComment));

router.post('/', catchErrors(saveComment));

router.put('/:id', catchErrors(editComment));

router.delete('/:id', catchErrors(deleteComment));

module.exports = router;
