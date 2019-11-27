import { ITask } from '@models/index';

export interface ITaskState {
    tasks: ITask[];
    duplicateTaskId: string;
    highlightedTasks: string[];
}
