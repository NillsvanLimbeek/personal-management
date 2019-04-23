import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Delete,
    Patch,
} from '@nestjs/common';

import { TasksService } from './tasks.service';

import { Task } from '@entity/index';
import { CreateTaskDto, UpdateTaskDto } from '@dtos/index';
import { DeleteResult } from 'typeorm';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    getTasks(): Promise<Task[]> {
        return this.tasksService.getTasks();
    }

    @Get(':id')
    getTask(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTask(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    // @Patch(':id')
    // updateTask(
    //     @Param('id') id: string,
    //     @Body() updateTaskDto: UpdateTaskDto,
    // ): Promise<ITask> {
    //     return this.tasksService.updateTask(id, updateTaskDto);
    // }

    @Delete(':id')
    deleteTask(@Param('id') id: string): Promise<Task> {
        return this.tasksService.deleteTask(id);
    }
}
