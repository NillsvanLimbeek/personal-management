import { SortType } from '@data/type';
import { ITask } from '@models/task';

function checkDate(date?: Date): number {
    return date != null ? date.getTime() : 0;
}

export function sortBy(arr: any, type: SortType): ITask[] {
    return arr.sort((a: any, b: any) => {
        let objA;
        let objB;

        if (type === 'date') {
            objA = checkDate(a.dueDate);
            objB = checkDate(b.dueDate);
        } else {
            objA = a[type].toUpperCase();
            objB = b[type].toUpperCase();
        }

        if (objA < objB) {
            return -1;
        }

        if (objA > objB) {
            return 1;
        }

        return 0;
    });
}
