import { Request, Response } from 'express';
import TaskSection from '../models/TaskSection';

async function getTaskSections(req: Request, res: Response) {
    const taskSections = await TaskSection.find();
    res.json(taskSections);
}

async function getTaskSection(req: Request, res: Response) {
    const taskSection = await TaskSection.findOne({ _id: req.params.id });
    res.json(taskSection);
}

async function saveTaskSection(req: Request, res: Response) {
    const taskSection = await new TaskSection(req.body).save();
    res.json(taskSection);
}

async function editTaskSection(req: Request, res: Response) {
    const taskSection = await TaskSection.findOneAndUpdate(
        { _id: req.body.id },
        req.body,
        { new: true, runValidators: true },
    ).exec();
    res.json(taskSection);
}

async function deleteTaskSection(req: Request, res: Response) {
    const taskSection = await TaskSection.remove({ _id: req.body.id });
    res.json(taskSection);
}

export {
    getTaskSections,
    getTaskSection,
    saveTaskSection,
    editTaskSection,
    deleteTaskSection,
};
