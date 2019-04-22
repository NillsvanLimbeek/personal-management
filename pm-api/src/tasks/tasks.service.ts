import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, Connection } from 'typeorm';

import { Task } from '@/entity/task.entity';
import { CreateTaskDto, UpdateTaskDto } from '@dtos/index';
import { ITask } from '@/interfaces';

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

    // async getTask(id: string): Promise<ITask> {
    //     const task = await this.taskModel.findById({ _id: id });

    //     if (!task) {
    //         throw new HttpException('task does not exist', 404);
    //     }

    //     return task;
    // }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = this.taskRepository.create({
            title: createTaskDto.title,
            description: createTaskDto.description,
            completed: createTaskDto.completed,
        });

        await this.taskRepository.save(task);

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

    // async deleteTask(id: string): Promise<ITask> {
    //     const task = await this.taskModel.findByIdAndDelete({ _id: id });

    //     if (!task) {
    //         throw new HttpException('task does not exist', 404);
    //     }

    //     return task;
    // }
}
