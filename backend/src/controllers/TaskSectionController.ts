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

async function saveTaskSection(req: Request, res: Response) {}

export { getTaskSections, getTaskSection };
