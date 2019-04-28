import { TaskSection } from '@models/TaskSection';

export interface ITaskSectionsService {
    FindAll(): Promise<TaskSection[]>;

    Find(id: number): Promise<TaskSection>;

    Create(taskSection: TaskSection): Promise<TaskSection>;

    Update(id: number, taskSection: TaskSection): Promise<TaskSection>;

    Delete(id: number): Promise<TaskSection>;
}
