export interface ITask {
    id: string;
    title: string;
    description?: any;
    completed: boolean;
    taskSectionId: string;
    dueDate?: Date;

    // TODO
    // assignedTo: string;
    // project: string
}
