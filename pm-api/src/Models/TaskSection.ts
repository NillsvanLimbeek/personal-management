import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsDefined } from 'class-validator';

@Entity('taskSections')
export class TaskSection {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsDefined()
    title: string;

    // TODO
    // @Column()
    // taskIds: number[];
}
