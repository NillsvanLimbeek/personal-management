import { ITaskState } from './task-state';
import { ITaskSectionState } from './task-section-state';
import { ICommentState } from './comment-state';

export interface IRootState {
    tasks: ITaskState;
    taskSections: ITaskSectionState;
    comments: ICommentState;
}
