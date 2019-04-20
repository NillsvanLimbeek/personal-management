import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { ITask } from '@interfaces/index';
import { CreateTaskDto, UpdateTaskDto } from '@dtos/index';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel('Task') private readonly taskModel: Model<ITask>,
    ) {}

    async getTasks(): Promise<ITask[]> {
        return await this.taskModel.find({});
    }

    async getTask(id: string): Promise<ITask> {
        const task = await this.taskModel.findById({ _id: id });

        if (!task) {
            throw new HttpException('task does not exist', 404);
        }

        return task;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<ITask> {
        const task = new this.taskModel(createTaskDto);
        return await task.save();
    }

    async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<ITask> {
        const task = await this.taskModel.findByIdAndUpdate(
            { _id: id },
            updateTaskDto,
            { new: true },
        );

        if (!task) {
            throw new HttpException('task does not exist', 404);
        }

        return task;
    }

    async deleteTask(id: string): Promise<ITask> {
        const task = await this.taskModel.findByIdAndDelete({ _id: id });

        if (!task) {
            throw new HttpException('task does not exist', 404);
        }

        return task;
    }
}
