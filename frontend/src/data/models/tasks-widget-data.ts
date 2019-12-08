import { ITask } from './task';
import { IProgressRingData } from './progress-ring-data';

export interface ITasksWidgetData {
    title: string;
    stroke: string;
    progressRing: IProgressRingData;
    tasks: ITask[];
}
