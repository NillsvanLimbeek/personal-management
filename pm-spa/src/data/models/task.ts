export interface ITask {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    taskSectionId: number;

    // TODO
    // assignedTo: string;
    // dueDate: Date;
    // project: string
}
