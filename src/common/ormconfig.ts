import dotenv from 'dotenv';
import path from 'path';
import { ConnectionOptions } from 'typeorm';
import { User } from '../entities/User';
import { Task } from '../entities/Task';
import { Board } from '../entities/Board';

dotenv.config({
    path: path.join(__dirname, '../../.env')
});

export const ormConfig: ConnectionOptions =  {
	type: 'postgres',
    host: 'postgres',
	port: 5433,
	username: 'postgres',
	password: 'postgres',
	database: 'rs_nodejs_app',
    synchronize: true,
    entities: [ User, Task, Board ],
}