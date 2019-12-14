import { Request, Response } from 'express';
import Task from '../models/Task';

async function getTasks(req: Request, res: Response) {
    const tasks = await Task.find();
    res.json(tasks);
}

async function getTask(req: Request, res: Response) {
    const task = await Task.findOne({ _id: req.params.id });
    res.json(task);
}

async function saveTask(req: Request, res: Response) {
    const task = await new Task(req.body).save();
    res.json(task);
}

async function editTask(req: Request, res: Response) {
    const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    }).exec();
    res.json(task);
}

async function deleteTask(req: Request, res: Response) {
    const task = await Task.remove({ _id: req.params.id });
    res.json(task);
}

export { getTasks, getTask, saveTask, editTask, deleteTask };
