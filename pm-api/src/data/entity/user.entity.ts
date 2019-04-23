import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsDefined, IsEmail, Min } from 'class-validator';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsDefined()
    userName: string;

    @Column()
    @IsDefined()
    @Min(6, { message: 'Password is too short' })
    password: string;

    @Column()
    @IsDefined()
    @IsEmail()
    email: string;
}
