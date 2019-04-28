import { TaskSection } from '@models/TaskSection';

export class UpdateTaskDto {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    assignedTo: string;
    dueDate: Date;
    taskSectionId: number;

    // TODO
    // auditLog: auditLogId;
    // comments: commentsIds;
    // project: ProjectId;
    // files: filesIds;
}
