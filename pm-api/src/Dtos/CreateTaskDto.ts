import { TaskSection } from '@models/TaskSection';

export class CreateTaskDto {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    assignedTo: string;
    dueDate: Date;
    taskSection: TaskSection;

    // TODO
    // auditLog: auditLogId;
    // comments: commentsIds;
    // project: ProjectId;
    // files: filesIds;
}
