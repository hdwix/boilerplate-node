import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `.env.${process.env.NODE_ENV}`,
    validationSchema: Joi.object({
      APP_NAME: Joi.string().required(),
      APP_PORT: Joi.number().default(3000),
      DB_USERNAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_HOST: Joi.string().required(),
    })
  })],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
