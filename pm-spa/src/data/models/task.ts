export interface ITask {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    taskSectionId: string;
    dueDate?: Date;
    comments: string[];

    // TODO
    // assignedTo: string;
    // project: string
}
