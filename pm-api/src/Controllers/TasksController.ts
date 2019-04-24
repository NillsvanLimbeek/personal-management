import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Delete,
    Patch,
    Dependencies,
} from '@nestjs/common';

import { TasksService } from '@/Services/TaskService';
import { ITaskService } from '@/Services/ITaskService';

import { Task } from '@/Models/Task';

import { CreateTaskDto } from '@/Dtos/CreateTaskDto';
import { UpdateTaskDto } from '@/Dtos/UpdateTaskDto';

@Controller('tasks')
@Dependencies(TasksService)
export class TasksController {
    constructor(private readonly tasksService: ITaskService) {}

    @Get()
    getTasks(): Promise<Task[]> {
        return this.tasksService.FindAll();
    }

    @Get(':id')
    getTask(@Param('id') id: number): Promise<Task> {
        return this.tasksService.Find(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.Create(createTaskDto);
    }

    @Patch(':id')
    updateTask(
        @Param('id') id: number,
        @Body() updateTaskDto: UpdateTaskDto,
    ): Promise<Task> {
        return this.tasksService.Update(id, updateTaskDto);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: number): Promise<Task> {
        return this.tasksService.Delete(id);
    }
}
