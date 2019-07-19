import { ITask } from './../data/models/task';

export function sortTasks(arr: ITask[]): ITask[] {
    return arr.sort((a, b) => {
        const nameA = a.title.toUpperCase();
        const nameB = b.title.toUpperCase();

        if (nameA < nameB) {
            return -1;
        }

        if (nameA > nameB) {
            return 1;
        }

        return 0;
    });
}
