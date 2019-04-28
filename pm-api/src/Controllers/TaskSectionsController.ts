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

import { TaskSectionsService } from '@/Services/TaskSectionsService';
import { ITaskSectionsService } from '@/Services/ITaskSectionsService';

import { TaskSection } from '@/Models/TaskSection';

import { CreateTaskSectionDto } from '@/Dtos/CreateTaskSectionDto';
import { UpdateTaskSectionDto } from '@/Dtos/UpdateTaskSectionDto';

@Controller('tasksections')
@Dependencies(TaskSectionsService)
export class TaskSectionsController {
    constructor(private readonly taskSectionsService: ITaskSectionsService) {}

    @Get()
    getTasks(): Promise<TaskSection[]> {
        return this.taskSectionsService.FindAll();
    }

    @Get(':id')
    getTask(@Param('id') id: number): Promise<TaskSection> {
        return this.taskSectionsService.Find(id);
    }

    @Post()
    createTask(
        @Body() createTaskSectionDto: CreateTaskSectionDto,
    ): Promise<TaskSection> {
        return this.taskSectionsService.Create(createTaskSectionDto);
    }

    @Patch(':id')
    updateTask(
        @Param('id') id: number,
        @Body() updateTaskSectionDto: UpdateTaskSectionDto,
    ): Promise<TaskSection> {
        return this.taskSectionsService.Update(id, updateTaskSectionDto);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: number): Promise<TaskSection> {
        return this.taskSectionsService.Delete(id);
    }
}
