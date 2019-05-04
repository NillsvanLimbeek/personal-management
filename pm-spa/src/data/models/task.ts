export interface ITask {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    taskSectionId: string;

    // TODO
    // assignedTo: string;
    // dueDate: Date;
    // project: string
}
