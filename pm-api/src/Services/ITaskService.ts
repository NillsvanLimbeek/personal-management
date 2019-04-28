import { Task } from '@models/Task';

export interface ITaskService {
    FindAll(): Promise<Task[]>;

    Find(id: number): Promise<Task>;

    Create(task: Task): Promise<Task>;

    Update(id: number, task: Task): Promise<Task>;

    Delete(id: number): Promise<Task>;
}
