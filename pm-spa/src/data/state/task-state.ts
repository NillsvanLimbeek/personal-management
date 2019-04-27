import { TaskTab } from '@type/index';
import { ITask, ITaskSection } from '@models/index';

export interface ITaskState {
    taskSections: ITaskSection[];
    tasks: ITask[];
    currentTab: TaskTab;
}
