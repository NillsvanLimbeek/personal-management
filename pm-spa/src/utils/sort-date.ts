import { ITask } from '@models/task';

function checkDate(date?: Date): number {
    return date != null ? date.getTime() : 0;
}

export function sortDate(arr: ITask[]): ITask[] {
    return arr.sort((a, b) => {
        const dateA = checkDate(a.dueDate);
        const dateB = checkDate(b.dueDate);

        if (dateA < dateB) {
            return -1;
        }

        if (dateA > dateB) {
            return 1;
        }

        return 0;
    });
}
