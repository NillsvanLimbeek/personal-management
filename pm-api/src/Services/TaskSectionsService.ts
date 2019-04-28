import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ITaskSectionsService } from './ITaskSectionsService';
import { TaskSection } from '@models/TaskSection';

@Injectable()
export class TaskSectionsService implements ITaskSectionsService {
    constructor(
        @InjectRepository(TaskSection)
        private readonly taskSectionRepository: Repository<TaskSection>,
    ) {}

    async FindAll(): Promise<TaskSection[]> {
        return await this.taskSectionRepository.find();
    }

    async Find(id: number): Promise<TaskSection> {
        const taskSection = this.taskSectionRepository.findOne(id);

        if (!taskSection) {
            throw new HttpException('Task section does not exist', 404);
        }

        return taskSection;
    }

    async Create(taskSection: TaskSection): Promise<TaskSection> {
        try {
            return await this.taskSectionRepository.save(taskSection);
        } catch (e) {
            throw new HttpException(e, 404);
        }
    }

    async Update(id: number, taskSection: TaskSection): Promise<TaskSection> {
        try {
            await this.taskSectionRepository.update(id, taskSection);

            return taskSection;
        } catch (e) {
            throw new HttpException(e, 404);
        }
    }

    async Delete(id: number): Promise<TaskSection> {
        try {
            const taskSectionToDelete = this.taskSectionRepository.findOne(id);
            await this.taskSectionRepository.delete(id);

            return taskSectionToDelete;
        } catch (e) {
            throw new HttpException(e, 404);
        }
    }
}
