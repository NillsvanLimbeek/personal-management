import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsDefined, IsDate } from 'class-validator';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    @IsDefined()
    title: string;

    @Column('text')
    description: string;

    @Column({ default: false })
    completed: boolean;

    @Column()
    assignedTo: string;

    @Column()
    @IsDate()
    dueDate: Date;

    // TODO
    // @Column()
    // auditLog: AuditLog[]

    // TODO
    // @Column()
    // comments: Comment[]

    // TODO
    // @Column()
    // files: File[]
}
