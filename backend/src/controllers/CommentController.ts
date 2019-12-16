import { Request, Response } from 'express';
import Comment from '../models/Comment';

async function getComments(req: Request, res: Response) {
    const comments = await Comment.find();
    res.json(comments);
}

async function getComment(req: Request, res: Response) {
    const comment = await Comment.findOne({ _id: req.params.id });
    res.json(comment);
}

async function saveComment(req: Request, res: Response) {
    const comment = await new Comment(req.body).save();
    res.json(comment);
}

async function editComment(req: Request, res: Response) {
    const comment = await Comment.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { runValidators: true, new: true },
    ).exec();
    res.json(comment);
}

async function deleteComment(req: Request, res: Response) {
    const comment = await Comment.deleteOne({ _id: req.params.id });
    res.json(comment);
}

export { getComments, getComment, saveComment, editComment, deleteComment };
