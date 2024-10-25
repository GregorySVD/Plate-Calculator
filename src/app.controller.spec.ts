// src/app.module.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

describe('AppModule', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env.test', // Separate environment file for tests if desired
        }),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('MONGODB_URI'),
          }),
          inject: [ConfigService],
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close(); // Clean up after tests
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should connect to the database', async () => {
    const mongooseConnection = app.get<MongooseModule>(MongooseModule);
    expect(mongooseConnection).toBeDefined();
  });
});
