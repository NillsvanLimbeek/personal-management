import { ITask } from './../data/models/task';

// function compareNumbers(a: string, b: string) {
//     return a - b;
// }

export function sortTasks(arr: ITask[]) {
    const sorted = arr.sort((a, b) => {
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

    return sorted;
}
