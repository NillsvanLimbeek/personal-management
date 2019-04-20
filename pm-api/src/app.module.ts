import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TasksModule } from './tasks/tasks.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/project-management-api', {
            useNewUrlParser: true,
            useCreateIndex: true,
        }),
        TasksModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
