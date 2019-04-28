import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskSectionsService } from '../Services/TaskSectionsService';
import { TaskSectionsController } from '../Controllers/TaskSectionsController';

import { TaskSection } from '@/Models/TaskSection';

@Module({
    imports: [TypeOrmModule.forFeature([TaskSection])],
    providers: [TaskSectionsService],
    controllers: [TaskSectionsController],
})
export class TaskSectionsModule {}
