import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsDefined, IsDate } from 'class-validator';

import { TaskSection } from '@models/TaskSection';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsDefined()
    title: string;

    @Column('text', { nullable: true })
    description: string;

    @Column({ default: false })
    completed: boolean;

    @Column({ nullable: true })
    assignedTo: string;

    @Column({ nullable: true })
    @IsDate()
    dueDate: Date;

    @ManyToOne(type => TaskSection, taskSection => taskSection.taskIds)
    taskSection: TaskSection;

    // TODO
    // @Column()
    // auditLog: AuditLog[]

    // TODO
    // @Column()
    // comments: Comment[]

    // TODO
    // @Column()
    // files: File[]

    // TODO
    // @Column()
    // project: Project;
}
