import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ITaskService } from './ITaskService';

import { Task } from '@/Models/Task';

@Injectable()
export class TasksService implements ITaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) {}

    async FindAll(): Promise<Task[]> {
        return await this.taskRepository.find();
    }

    async Find(id: number): Promise<Task> {
        // TODO throw error if nothing found
        return await this.taskRepository.findOne(id);
    }

    async Create(task: Task): Promise<Task> {
        // throw error is something went wrong
        await this.taskRepository.save(task);
        return task;
    }

    async Update(id: number, task: Task): Promise<Task> {
        try {
            await this.taskRepository.update(id, task);

            return task;
        } catch (e) {
            // throw error if something went wrong
        }
    }

    async Delete(id: number): Promise<Task> {
        try {
            const taskToDelete = this.taskRepository.findOne(id);
            await this.taskRepository.delete(id);

            return taskToDelete;
        } catch (e) {
            // TODO throw error is seomthing went wrong
        }
    }
}
