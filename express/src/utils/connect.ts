import { createConnection, Connection } from 'typeorm';
import { ormConfig } from '../common/ormconfig';

export default async function dbConnect(): Promise<Connection> {
	return await createConnection(ormConfig)
}