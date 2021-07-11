import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { User } from './user/entities/user.entity';
import { Task } from './task/entities/task.entity';
import { Board } from './board/entities/board.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '4515',
      database: 'node_nest',
      entities: [User, Task, Board],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    BoardModule,
    TaskModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
