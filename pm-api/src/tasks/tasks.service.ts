import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, Connection, getConnection, DeleteResult } from 'typeorm';

import { Task } from '@entity/index';
import { CreateTaskDto, UpdateTaskDto } from '@dtos/index';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        private readonly connection: Connection,
    ) {}

    async getTasks(): Promise<Task[]> {
        return await this.taskRepository.find();
    }

    async getTask(id: string): Promise<Task> {
        const task = await this.taskRepository.findOne(id);

        // TODO return error if nothing is found

        return task;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = this.taskRepository.create({
            title: createTaskDto.title,
            description: createTaskDto.description,
            completed: createTaskDto.completed,
        });

        await this.taskRepository.save(task);

        // TODO return erro if something went wrong

        return task;
    }

    // async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<ITask> {
    //     const task = await this.taskModel.findByIdAndUpdate(
    //         { _id: id },
    //         updateTaskDto,
    //         { new: true },
    //     );

    //     if (!task) {
    //         throw new HttpException('task does not exist', 404);
    //     }

    //     return task;
    // }

    async deleteTask(id: string): Promise<Task> {
        const task = await this.taskRepository.findOne(id);
        await this.taskRepository.delete(id);

        return task;
    }
}
