import { ITaskState } from './task-state';
import { ITaskSectionState } from './task-section-state';
import { IModalsState } from './modal-state';

export interface IRootState {
    tasks: ITaskState;
    taskSections: ITaskSectionState;
    modals: IModalsState;
}
