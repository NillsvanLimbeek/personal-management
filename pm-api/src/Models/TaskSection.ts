import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsDefined } from 'class-validator';

import { Task } from '@models/Task';

@Entity('taskSections')
export class TaskSection {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsDefined()
    title: string;

    @OneToMany(type => Task, task => task.id)
    tasks: Task[];
}
