import dotenv from 'dotenv';
import { resolve } from 'path';

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
const envPath = resolve(__dirname, '..', envFile);

dotenv.config({
   path: envPath
});

export default {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USER || 'test',
  password: process.env.DB_PASS || 'test',
  database: process.env.DB_NAME || 'test',
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
