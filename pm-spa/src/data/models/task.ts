export interface ITask {
    id?: number;
    title: string;
    description: string;
    completed: boolean;
    sectionId: number;

    // TODO
    // assignedTo: string;
    // dueDate: Date;
    // project: string
}
