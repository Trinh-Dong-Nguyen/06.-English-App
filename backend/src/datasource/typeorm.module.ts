import { DataSource } from 'typeorm';
import { Global, Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';

interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DataSource,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const dbConfig = configService.get<DatabaseConfig>('database');
        try {
          const dataSource = new DataSource({
            type: 'postgres',
            host: dbConfig.host,
            port: dbConfig.port,
            ssl: {
              rejectUnauthorized: false,
            },
            username: dbConfig.username,
            password: dbConfig.password,
            database: dbConfig.database,
            synchronize: true,
            entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
            logging: true,
            logger: 'advanced-console',
          });
          await dataSource.initialize();
          console.log('Database connected successfully');
          return dataSource;
        } catch (error) {
          console.log('Error connecting to database');
          console.log(error.message);
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class TypeOrmModule {}
