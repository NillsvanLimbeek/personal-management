import { Request, Response } from 'express';

function getTasks(req: Request, res: Response) {
    res.send('It works!, IT WORKS!');
}

export { getTasks };
