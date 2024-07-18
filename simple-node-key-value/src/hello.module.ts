import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HelloService } from './domain/services/hello.service';
import { LoggerMiddleware } from './app/middleware/logger.middleware';
import { HelloRepository } from './infrastructure/repository/hello.repository';
import { modelProviders } from './infrastructure/model';
import { HelloController } from './app/controllers/hello.controller';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: "single",
        url: `redis://${configService.get<string>("REDIS_HOST")}:${configService.get<number>("REDIS_PORT")}`,
      }),
    }),
  ],
  controllers: [HelloController],
  providers: [HelloService, HelloRepository, ...modelProviders],
})
export class HelloModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(HelloController);
  }
}
