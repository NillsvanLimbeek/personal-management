export class CreateTaskDto {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    assignedTo: string;
    dueDate: Date;

    // TODO
    // auditLog: auditLogId;
    // comments: commentsIds;
    // project: ProjectId;
    // files: filesIds;
}
