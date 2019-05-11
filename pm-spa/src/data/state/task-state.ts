import { TaskTab } from '@type/index';
import { ITask } from '@models/index';

export interface ITaskState {
    tasks: ITask[];
    // currentTab: TaskTab;
}
