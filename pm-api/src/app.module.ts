import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TasksModule } from '@/Modules/TasksModule';

@Module({
    imports: [TypeOrmModule.forRoot(), TasksModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
