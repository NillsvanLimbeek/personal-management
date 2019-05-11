import { ITaskState } from './task-state';
import { ITaskSectionState } from './task-section-state';

export interface IRootState {
    tasks: ITaskState;
    taskSections: ITaskSectionState;
}
