import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from '@open-lens/typeorm-naming-strategies';
config();

export const connectionSource = new DataSource({
  url: process.env.DB__URL,
  type: 'postgres',
  namingStrategy: new SnakeNamingStrategy(),
  entities: [`${__dirname}/**/**.entity{.ts,.js}`],
  migrations: [`${__dirname}/_migrations/*{.ts,.js}`],
  migrationsTableName: '_migrations',
});
