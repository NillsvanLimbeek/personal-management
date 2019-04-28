import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsDefined, IsDate } from 'class-validator';

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

    @Column({ nullable: true })
    taskSectionId: number;

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
