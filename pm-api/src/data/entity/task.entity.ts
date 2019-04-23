import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsDefined } from 'class-validator';

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
}
