import { Task } from '@models/Task';

export interface CreateTaskSectionDto {
    id: number;
    title: string;
    tasks: Task[];
}
