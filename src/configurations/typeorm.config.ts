import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'db@0000',
  database: 'users',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
