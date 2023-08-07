import {ConfigService} from "@nestjs/config";
import {TypeOrmModuleOptions} from "@nestjs/typeorm";

export const typeOrmConfig = (config: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.get('TYPEORM_HOST'),
  port: config.get('TYPEORM_PORT'),
  username: config.get('TYPEORM_USERNAME'),
  password: config.get('TYPEORM_PASSWORD'),
  database: config.get('TYPEORM_DATABASE'),
  entities: [__dirname + process.env.TYPEORM_ENTITIES],
  migrations: [__dirname + process.env.TYPEORM_MIGRATIONS],
  cli: {
    entitiesDir: process.env.TYPEORM_ENTITIES_DIR,
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR
  },
  synchronize: true,
  logging: config.get('TYPEORM_LOGGING') == 'true',
});

