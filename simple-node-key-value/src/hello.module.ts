import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HelloService } from './domain/services/hello.service';
import { LoggerMiddleware } from './app/middleware/logger.middleware';
import { HelloRepository } from './infrastructure/repository/hello.repository';
import { modelProviders } from './infrastructure/model';
import { HelloController } from './app/controllers/hello.controller';
import { RedisModule } from './infrastructure/redis/redis.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisService } from './infrastructure/redis/redis.service';


@Module({
  imports: [
    ConfigModule.forRoot(),
    RedisModule
  ],
  controllers: [HelloController],
  providers: [RedisService,HelloService, HelloRepository, ...modelProviders],
  exports: [RedisService]
})
export class HelloModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(HelloController);
  }
}
