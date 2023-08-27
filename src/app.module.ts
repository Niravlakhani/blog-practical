import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationModules } from './modules/application.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Blog } from './modules/blog/entities/blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Blog], // Add other entities here if needed
        synchronize: false,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ...ApplicationModules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
